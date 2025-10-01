import axios from "axios";
import { IAddress } from "../type/address";

const ADDRESS_URL = process.env.NEXT_PUBLIC_API_URL + '/address'

export const createAddressHttp = async (addressData: IAddress): Promise<IAddress | undefined> => {
    try {
        const response = await axios.post<IAddress>(ADDRESS_URL, addressData)
        return response.data
    } catch (error) {
        console.log("Error in 'createAddress'")
    }
}