import axios from "axios"
import { IUser } from "../type/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const NGROK_URL = process.env.NEXT_PUBLIC_NGROK_URL!;

export const getUsersUrl = async (): Promise<string> => {
  try {
    await axios.get(NGROK_URL + '/users');
    return NGROK_URL + '/users';
  } catch (error) {
    return API_URL + '/users';
  }
};

const USER_URL = await getUsersUrl()


export const getUsersHttp = async (): Promise<IUser[] | undefined> => {
    try {
        const users = await axios.get<IUser[]>(USER_URL)
        return users.data;
    } catch (error) {
        console.log("Error in 'getUserHttp'", error)
    }
}

export const getUserByIdHttp = async (userId: number): Promise<IUser | undefined> => {
    try {
        const user = await axios.get<IUser>(`${USER_URL}/${userId}`)
        return user.data
    } catch (error) {
        console.log("Error in 'getUserByIdHttp' ", error)
    }
}

export const getUserByEmailHttp = async (email: string): Promise<IUser | undefined> => {
    try {
        const allUsers = await getUsersHttp()

        if (!allUsers) throw new Error("allUsers error in 'getUserByEmailHttp'")

        //console.log(allUsers)
        const user = allUsers.find((u) => u.email === email)

        if (!user) throw new Error("user error in 'getUserByEmailHttp'")
        
        //console.log(user)
        return user;
    } catch (error) {
        console.log("Error in 'getUserByIdHttp'", error)
    }
}

export const updateUserHttp = async (userId: number, body: Partial<IUser>): Promise<IUser | undefined> => {
    try {
        const response = await axios.put<IUser>(`${USER_URL}/${userId}`, body)
        console.log("updated user", response.data)
        return response.data;
    } catch (error) {
        console.log("Error in 'updateUserHttp' ", error)
    }
}

export const deleteUserHttp = async (userId: number): Promise<void> => {
    try {
        await axios.delete<string>(`${USER_URL}/${userId}`)
    } catch (error) {
        console.log("Error in 'deleteUserHttp'", error)
    }
}

export const addProfileIconHttp = async (userId: number, body: Partial<IUser>): Promise<IUser | undefined> => {
    try {
        const response = await axios.put<IUser>(`${USER_URL}/add_profile_icon/${userId}`, body)
        console.log("User updated: ", response.data)
        return response.data;
    } catch(error) {
        console.log("Error in 'addProfileIconHttp' ", error)
    }
}