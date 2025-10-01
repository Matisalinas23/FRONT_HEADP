import axios from "axios"
import { ICategory } from "../type/category"

const CATEGORIES_URL = process.env.NEXT_PUBLIC_API_URL + '/categories'


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
