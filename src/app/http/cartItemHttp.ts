import axios from "axios";
import { ICartItem } from "../type/cartItem";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_LOCAL_API_URL
const CART_ITEMS_URL = `${BASE_URL}/cartItems`

export const createCartItemHttp = async (quantity: number, userId: number, productId: number): Promise<ICartItem | undefined> => {
    try {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,{ quantity: quantity })
        const response = await axios.post(`${CART_ITEMS_URL}/${userId}/${productId}`, quantity)

        return response.data;
    } catch (error) {
        console.log("There was an error on createCartItem ", error)
    }
}

export const getCartItemsHttp = async (userId: number): Promise<ICartItem[] | undefined> => {
    try {
        const response = await axios.get(`${CART_ITEMS_URL}/${userId}`)

        return response.data;
    } catch (error) {
        console.log("There was an error on getCartItemsHttp ", error)
    }
}

