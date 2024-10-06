/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_ROUTES } from "@/contants/api-constant";
import { CustomError } from "@/custom/CustomError";
// import { AccountsAPICall } from "./accountsApiCall";
import { cookies } from 'next/headers';

export type httpVerb = 'get' | 'post' | 'delete' | 'put' | 'patch';

type AxiosResp<T> = { data: { message: string, data: T, row: T } }

// let auth_token: string;
// let refresh_token: string;

export async function makeRequest<T>(httpType: httpVerb, route: string, payload = {}, config: AxiosRequestConfig = {}, isRefreshTokenCalled = false) {
    try {
        const API_ENDPOINT = getEndpoint(route);
        const requestConfig: AxiosRequestConfig = {
            headers: await getHeader(!route.includes('PUBLIC')),
            ...config
        }
        // console.log(API_ENDPOINT, payload, httpType);
        const response: AxiosResp<T> = await axios({ method: httpType, url: API_ENDPOINT, data: payload, ...requestConfig });

        const return_response = {
            success: true as const,
            message: response.data?.message,
            data: response?.data?.data || response?.data?.row || response?.data as T,
        }
        return return_response;

    } catch (err) {
        const error = err as AxiosError<Error>;
        const status = error?.response?.status || error?.status || (err as CustomError)?.customStatus || 500;
        const message = parseMsgObj(error?.message) || (err as CustomError)?.customMsg || 'Something went wrong!';

        console.log('API calling Error => ', message, error.response?.data, status, isRefreshTokenCalled);

        // if (status === 403 || status === 401) {
        //     // === taking actions if access token expired=====
        //     // const res = await AccountsAPICall("post", "REFRESH_TOKEN", { refresh_token });
        //     // console.log(refresh_token, 'refresh_token')
        //     const res = {success: false}
        //     if (!res?.success || isRefreshTokenCalled) {
        //         // FOR REDIRECT to ACCOUNT
        //         return { success: false as const, message: "REDIRECT_TO_LOGIN_PAGE", errors: [] }
        //         // redirect(process.env.NEXT_PUBLIC_ACCOUNTS_DASHBOARD_URL || '');
        //     } else {
        //         return await makeRequest(httpType, route, payload, config, true);
        //     }
        // }

        return { success: false as const, message, errors: (error as any).response?.data?.errors ?? [] };
    }

}

const getEndpoint = (route: string) => {
    // converting "USER_LIST/[id] or USER_LIST?params..." to "[API_ROUTES]/[id] of [API_ROUTES]?params..."
    const upperCaseRoute = route.match(/[A-Z_]+/)?.join('') as string;
    let api_route = API_ROUTES?.[upperCaseRoute];
    if (!api_route) throw new CustomError(`${route} route is not defined`);

    api_route = route.replace(upperCaseRoute, api_route);

    const endpoint = process.env?.NEXT_PUBLIC_API_BASE_URL + api_route
    return endpoint.replace(/(https?:\/\/|wss?:\/\/)|(\/){2,}/g, '$1$2');
}

// const getAccessToken = async () => {
//     try {
//         const sso_token = await cookies().get('sso_token')?.value ?? '';
//         const resp = await axios.get(`${process.env.NEXT_PUBLIC_CHECKOUT_BASE_URL}api/get-token?sso_token=${sso_token}`)
//         const data = resp?.data
//         if (data?.success) {
//             return data?.data
//         }
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (err) {
//         console.log('Error while fetching redis data for in apiCall')
//     }
//     return null;
// }

const getHeader = async (isAuthorized = true) => {
    const headers: AxiosRequestConfig['headers'] = {
        'Content-Type': 'application/json'
    }

    if(isAuthorized) {
        // const accessDataResp = await getAccessToken();
        // const auth_token = accessDataResp?.access_token
        const auth_token = await cookies().get('auth-token')?.value
        if (!auth_token) {
            // REDIRECT TO ACCOUNT PAGE
            throw new CustomError('Auth token is required.', 403);
        }
        // refresh_token = accessDataResp?.refresh_token
        headers.Authorization = 'Bearer ' + auth_token;
    }

    return headers;
}

// get string from object.
function parseMsgObj(msg: Record<string, unknown> | string | undefined): string {
    if (typeof msg === 'string') return msg
    let errorMsg = ''
    Object.values(msg ?? {})?.forEach(item => {
        if (typeof item === 'string') errorMsg += `${item} `
        else errorMsg += parseMsgObj(item as Record<string, unknown>)
    })
    return errorMsg
}