import axios from "axios";
import { IUser } from "../type/user";

interface AuthResponse {
    token: string;
}

const AUTH_URL = process.env.NEXT_PUBLIC_API_URL + '/auth';

console.log(AUTH_URL)


export const registerUserHttp = async (userData: IUser): Promise<string | undefined> => {
    try {
        const data = await axios.post(AUTH_URL + "/register", userData)
        return data.data; //Returns a token one is accessed with ".data"
    } catch (error) {
        console.log("There was an error on registerUserHttp ", error)
    }
}

export const loginUserHttp = async (email: string, password: string): Promise<string | undefined> => {
    console.log("email: ", email)
    console.log("password: ", password)
    try {
        const response = await axios.post<AuthResponse>(AUTH_URL + "/login", { email, password })
        return response.data.token //Returns a token one is accessed with ".data"
    } catch (error) {
        console.log("There was an error on loginUserHttp ", error)
    }
}

