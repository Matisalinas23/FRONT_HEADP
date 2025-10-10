import axios from "axios"
import { IUser } from "../type/user";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_LOCAL_API_URL
const USER_URL = `${BASE_URL}/users`

export const getUsersHttp = async (): Promise<IUser[] | undefined> => {
    const token = localStorage.getItem('token')

    try {
        if (!token) {
            console.error("Token was not found in local storage")
            throw new Error
        }

        const users = await axios.get<IUser[]>(USER_URL, { headers: { Authorization: `Bearer: ${token}` } })
        return users.data;
    } catch (error) {
        console.log("Error in 'getUserHttp'", error)
    }
}

export const getUserByIdHttp = async (userId: number): Promise<IUser | undefined> => {
    const token = localStorage.getItem('token')

    try {
        if (!token) {
            console.error("Token was not found in local storage")
            throw new Error
        }

        const user = await axios.get<IUser>(`${USER_URL}/${userId}`, { headers: { Authorization: `Bearer: ${token}` } } )

        return user.data
    } catch (error) {
        console.log(error)
    }
}

export const getUserByEmailHttp = async (email: string): Promise<IUser | undefined> => {
    try {
        const response = await axios.get(`${USER_URL}/${email}`)

        return response.data
    } catch (error) {
        console.error(error)
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