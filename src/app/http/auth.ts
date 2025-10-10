import axios from "axios";
import { IUser } from "../type/user";

export interface LoginResponse {
    token: string
    userId: number
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_LOCAL_API_URL
const AUTH_URL = `${BASE_URL}/auth`

console.log(AUTH_URL)


export const registerUserHttp = async (userData: IUser): Promise<{ token: string, userId: number } | undefined> => {
    try {
        const response = await axios.post(AUTH_URL + "/register", userData)
        console.log("Response: ", response.data)
        localStorage.setItem('token', response.data.token)
        return response.data;
    } catch (error) {
        console.log("There was an error on registerUserHttp ", error)
    }
}

export const loginUserHttp = async (email: string, password: string): Promise<LoginResponse | undefined> => {
    try {
        const response = await axios.post<LoginResponse>(AUTH_URL + "/login", { email, password })
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('logedUser', String(response.data.userId))
        return response.data
    } catch (error) {
        console.log("There was an error on loginUserHttp ", error)
    }
}

