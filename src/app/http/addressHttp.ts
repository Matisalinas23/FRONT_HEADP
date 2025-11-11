import api from './axios'
import { IAddress } from "../type/address";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
const ADDRESS_URL = `${BASE_URL}/address`

export const createAddressHttp = async (addressData: IAddress): Promise<IAddress | undefined> => {
    try {
        const response = await api.post<IAddress>(ADDRESS_URL, addressData)
        return response.data
    } catch (error) {
        console.log("Error in 'createAddress'")
    }
}