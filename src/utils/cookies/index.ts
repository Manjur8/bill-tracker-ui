/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export const getCookies = async (key: string) => {
     return await cookies().get(key)?.value
}

export const setCookies = async (key: string, value: string) => {
    const expireTime = 30*24*60*60
    await cookies().set(key, value, {httpOnly: true, maxAge: expireTime})
}