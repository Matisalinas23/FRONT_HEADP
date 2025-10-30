import api from "./axios";
import { ICartItem } from "../type/cartItem";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_LOCAL_API_URL
const CART_ITEMS_URL = `${BASE_URL}/cartItems`

export const createCartItemHttp = async (quantity: number, userId: number, productId: number): Promise<ICartItem | undefined> => {
    try {
        const token = localStorage.getItem('token')
        await api.put(
            `${BASE_URL}/products/${productId}`,
            { quantity: quantity },
            { headers: { Authorization: `Bearer: ${token}` } }
        )
        const response = await api.post(
            `${CART_ITEMS_URL}/${userId}/${productId}`,
            quantity,
            { headers: { Authorization: `Bearer: ${token}` } }
        )

        return response.data;
    } catch (error) {
        console.log("There was an error on createCartItem ", error)
    }
}

export const getCartItemsHttp = async (userId: number): Promise<ICartItem[] | undefined> => {
    try {
        const token = localStorage.getItem('token')
        const response = await api.get(
            `${CART_ITEMS_URL}/${userId}`,
            { headers: { Authorization: `Bearer: ${token}` }}
        )

        return response.data;
    } catch (error) {
        console.log("There was an error on getCartItemsHttp ", error)
    }
}

