import axios from "axios";
import { IProfileIcon } from "../type/profileIcon";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const NGROK_URL = process.env.NEXT_PUBLIC_NGROK_URL!;

export const getProfileIconsUrl = async (): Promise<string> => {
  try {
    await axios.get(NGROK_URL + '/profile_icons');
    return NGROK_URL + '/profile_icons';
  } catch (error) {
    return API_URL + '/profile_icons';
  }
};

const PROFILE_ICON_URL = await getProfileIconsUrl()


export const getAllProfileIconsHttp = async (): Promise<IProfileIcon[] | undefined> => {
    try {
        const response = await axios.get<IProfileIcon[]>(PROFILE_ICON_URL)

        if (!response) throw new Error("Error getting profile icons")

        return response.data;
    } catch (error) {
        console.log("Error in 'getAllProfileIconsHttp' ", error)
    }
}