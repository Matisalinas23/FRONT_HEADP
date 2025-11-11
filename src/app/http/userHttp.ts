import axios from "axios"
import api from './axios'
import { IUser } from "../type/user";
import { IAddress } from "../type/address";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
const USER_URL = `${BASE_URL}/users`

export const getUsersHttp = async (): Promise<IUser[] | undefined> => {
    try {
        const users = await axios.get<IUser[]>(USER_URL)

        return users.data;
    } catch (error) {
        console.log("Error in 'getUsersHttp'", error)
    }
}

export const getUserByIdHttp = async (userId: number): Promise<IUser | undefined> => {
    const token = localStorage.getItem('token')

    try {
        if (!token) {
            console.error("Token was not found in local storage")
            throw new Error
        }

        const user = await api.get<IUser>(`${USER_URL}/${userId}`)

        return user.data
    } catch (error) {
        console.log(error)
    }
}

export const getUserByEmailHttp = async (email: string): Promise<IUser | undefined> => {
    try {
        const response = await api.get(`${USER_URL}/get_by_email/${email}`)

        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const updateUserHttp = async (userId: number, body: Partial<IUser>): Promise<IUser | undefined> => {
    try {
        const response = await api.put<IUser>(
            `${USER_URL}/${userId}`,
            body
        )
        
        return response.data;
    } catch (error) {
        console.log("Error in 'updateUserHttp' ", error)
    }
}

export const updateUserAddressHttp = async (userId: number, address: IAddress): Promise<IUser | undefined> => {
    console.log("address: ", address)
    try {
        const response = await api.put<IUser>(
            `${USER_URL}/update_address/${userId}`,
            address,
        )

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteUserHttp = async (userId: number): Promise<void> => {
    try {
        await api.delete<string>(`${USER_URL}/${userId}`)
    } catch (error) {
        console.log("Error in 'deleteUserHttp'", error)
    }
}

export const addProfileIconHttp = async (userId: number, body: { iconId: number }): Promise<IUser | undefined> => {
    try {
        const response = await api.put<IUser>(`${USER_URL}/add_profile_icon/${userId}`, body)

        return response.data;
    } catch(error) {
        console.log("Error in 'addProfileIconHttp' ", error)
    }
}