import axios from "axios";
import { IUser } from "../type/user";

interface AuthResponse {
    token: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const NGROK_URL = process.env.NEXT_PUBLIC_NGROK_URL!;

export const getAuthUrl = async (): Promise<string> => {
  try {
    await axios.get(NGROK_URL + '/auth');
    return NGROK_URL + '/auth';
  } catch (error) {
    return API_URL + '/auth';
  }
};

const authUrl = await getAuthUrl()
console.log(authUrl)


export const registerUserHttp = async (userData: IUser): Promise<string | undefined> => {
    try {
        const data = await axios.post(authUrl + "/register", userData)
        return data.data; //Returns a token one is accessed with ".data"
    } catch (error) {
        console.log("There was an error on registerUserHttp ", error)
    }
}

export const loginUserHttp = async (email: string, password: string): Promise<string | undefined> => {
    console.log("email: ", email)
    console.log("password: ", password)
    try {
        const response = await axios.post<AuthResponse>(authUrl + "/login", { email, password })
        return response.data.token //Returns a token one is accessed with ".data"
    } catch (error) {
        console.log("There was an error on loginUserHttp ", error)
    }
}

