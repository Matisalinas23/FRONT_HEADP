import api from "./axios"
import { ISale } from "../type/sale"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
const SALES_URL = `${BASE_URL}/sales`

export const getAllSalesHttp = async (): Promise<ISale[]> => {
    const token = localStorage.getItem('token')
    try {
        const response = await api.get<ISale[]>(SALES_URL)

        return response.data
    } catch (error) {
        console.log(error)
        return []
    }
}