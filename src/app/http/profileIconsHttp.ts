import axios from "axios";
import { IProfileIcon } from "../type/profileIcon";

const PROFILE_ICON_URL = process.env.NEXT_PUBLIC_API_URL + '/profile_icons'


export const getAllProfileIconsHttp = async (): Promise<IProfileIcon[] | undefined> => {
    try {
        const response = await axios.get<IProfileIcon[]>(PROFILE_ICON_URL)

        if (!response) throw new Error("Error getting profile icons")

        return response.data;
    } catch (error) {
        console.log("Error in 'getAllProfileIconsHttp' ", error)
    }
}