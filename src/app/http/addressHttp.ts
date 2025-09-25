import axios from "axios";
import { IAddress } from "../type/address";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const NGROK_URL = process.env.NEXT_PUBLIC_NGROK_URL!;

export const getAddressUrl = async (): Promise<string> => {
  try {
    await axios.get(NGROK_URL + '/address');
    return NGROK_URL + '/address';
  } catch (error) {
    return API_URL + '/address';
  }
};

const ADDRESS_URL = await getAddressUrl()

export const createAddressHttp = async (addressData: IAddress): Promise<IAddress | undefined> => {
    try {
        const response = await axios.post<IAddress>(ADDRESS_URL, addressData)
        return response.data
    } catch (error) {
        console.log("Error in 'createAddress'")
    }
}