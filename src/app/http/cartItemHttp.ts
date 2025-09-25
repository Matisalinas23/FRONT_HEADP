import axios from "axios";
import { ICartItem } from "../type/cartItem";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const NGROK_URL = process.env.NEXT_PUBLIC_NGROK_URL!;

export const getCartItemsUrl = async (): Promise<string> => {
  try {
    await axios.get(NGROK_URL + '/cartItems');
    return NGROK_URL + '/cartItems';
  } catch (error) {
    return API_URL + '/cartItems';
  }
};

const CART_ITEMS_URL = await getCartItemsUrl()


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

