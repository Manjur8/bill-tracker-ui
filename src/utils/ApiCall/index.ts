/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { makeRequest } from "@/utils/ApiCall/makeRequest";
// import { redirectToLoginPage } from "./redirectToLoginPage";
// import { API_ROUTES } from "@/contants/api-constant";
// import { CustomError } from "@/custom/Helper/CustomError";
// import { AccountsAPICall } from "./accountsApiCall";

export type httpVerb = 'get' | 'post' | 'delete' | 'put' | 'patch';

type response<T> = { success: true, message: string, data: T } | {
  success: false, message: string, errors: any
}

export async function APICall<T>(httpType: httpVerb, route: string, payload = {}, config: AxiosRequestConfig = {},) {

    try {
        let responseData: response<T>;
        if(typeof window === "undefined"){
            // For Server Side API call
            responseData = await makeRequest<T>(httpType, route, payload, config );
        }else{
            // For Client Side API call, next api route file
            const response = await axios<response<T>>({ method: httpType, url: `/api/${route}`, data: payload, ...config });
            responseData = response?.data;
        }
        
        // if(responseData?.message === "REDIRECT_TO_LOGIN_PAGE") await redirectToLoginPage();

        return responseData;

    } catch (err) {
        const error = err as AxiosError<Error>;
        const status = error?.response?.status || error?.status || 500;
        const message = error?.message || 'Something went wrong!';
        
        console.error('Next API route Error =>>', error?.message, status)
        
        // if(message === "NEXT_REDIRECT") await redirectToLoginPage();

        return { success: false as const, message, errors: []}
    }
}



// import { redirect } from "next/navigation";

// export async function redirectToLoginPage(){
//     "use server";
//     await redirect(process.env.NEXT_PUBLIC_ACCOUNTS_DASHBOARD_URL || '');
// }
  