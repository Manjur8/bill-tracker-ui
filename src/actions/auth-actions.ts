"use server"
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const signInSubmit = (formData: Record<string, unknown>) => {
    console.log(formData, "data Sign in received")
}

export const signUpSubmit = async (formData: Record<string, unknown>) => {
    const payload: Record<string, unknown> = {...formData, phone: String(formData.phone), secrets: {password: formData.password}}
    delete payload.confirm_password
    delete payload.password

    const endpoint = '/users/signup';
    
    let resp;

    try {
        resp = await axios.post(API_BASE_URL + endpoint, payload, { headers: {'Content-Type': 'application/json' }});
        console.log(resp, 'success')
  
      } catch(error) {
        resp = {
            status: (error as {status: number})?.status || 400,
            message: (error as {message: string}).message || "Something went wrong",
            success: false,
        }
        console.log({end: API_BASE_URL+endpoint, payload, error}, 'err')
      }

    return resp
    // console.log({end: API_BASE_URL+endpoint, payload, resp})
}