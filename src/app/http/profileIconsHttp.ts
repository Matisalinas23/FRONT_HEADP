import api from './axios'
import { IProfileIcon } from "../type/profileIcon";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_LOCAL_API_URL
const PROFILE_ICON_URL = `${BASE_URL}/profile_icons`

export const getAllProfileIconsHttp = async (): Promise<IProfileIcon[] | undefined> => {
    try {
        const token = localStorage.getItem('token')
        const response = await api.get<IProfileIcon[]>(PROFILE_ICON_URL)

        if (!response) throw new Error("Error getting profile icons")

        return response.data;
    } catch (error) {
        console.log("Error in 'getAllProfileIconsHttp' ", error)
    }
}