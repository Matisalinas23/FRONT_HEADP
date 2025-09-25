import axios from "axios"
import { ICategory } from "../type/category"

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const NGROK_URL = process.env.NEXT_PUBLIC_NGROK_URL!;

export const getCategoriesUrl = async (): Promise<string> => {
  try {
    await axios.get(NGROK_URL + '/categories');
    return NGROK_URL + '/categories';
  } catch (error) {
    return API_URL + '/categories';
  }
};

const CATEGORIES_URL = await getCategoriesUrl()


export const createCategoryHttp = async(body: ICategory): Promise<ICategory | undefined> => {
    try {
        const response = await axios.post<ICategory>(CATEGORIES_URL, body)

        return response.data;
    } catch (error) {
        console.log("Error in 'createCategoryHttp' ", error)
    }
}

export const getCategoriesHttp = async(): Promise<ICategory[] | undefined> => {
    try {
        const response = await axios.get<ICategory[]>(CATEGORIES_URL)

        return response.data;
    } catch (error) {
        console.log("Error in 'getCategoriesHttp' ", error)
    }
}

export const deleteCategoryHttp = async(categoryId: number): Promise<void> => {
    try {
        const response = await axios.delete(`${CATEGORIES_URL}/${categoryId}`)
        console.log(response.data)
    } catch (error) {
        console.log("Error in 'deleteCategoryHttp' ", error)
    }
}
