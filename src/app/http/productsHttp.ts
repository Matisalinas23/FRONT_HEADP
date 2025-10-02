import axios from "axios"
import { IProduct } from "../type/product"
import { ICategory } from "../type/category"

const PRODUCT_URL = process.env.NEXT_PUBLIC_API_URL + '/products'  || process.env.NEXT_LOCAL_API_URL + '/products'

console.log('producturl: ', PRODUCT_URL)

export const getProductsHttp = async(): Promise<IProduct[] | undefined> => {
    try {
        const response = await axios.get<IProduct[]>(PRODUCT_URL)

        return response.data;
    } catch (error) {
        console.log("Error in 'getProductsHttp' ", error)
    }
}

export const getProductHttp = async(id?: number, name?: string): Promise<IProduct | undefined> => {
    try {
        const response = await axios.get<IProduct>(`${PRODUCT_URL}/search?${id ? `id=${id}` : `name=${name}`}`)

        return response.data;
    } catch (error) {
        console.log("Error in 'getProductHttp' ", error)
    }
}

export const getProductByIdHttp = async(productId: string): Promise<IProduct | undefined> => {
    try {
        const response = await axios.get<IProduct>(`${PRODUCT_URL}/search?id=${productId}`)
        console.log('status: ', response.status)
        console.log('headers: ', response.headers)
        console.log('data: ', response.data)

        return response.data
    } catch (error) {
        console.log("Error in 'getProductByIdHttp' ", error)
    }
}

export const getProductsByCategoriesHttp = async(categoryIds: number[]): Promise<IProduct[] | undefined> => {
    const query = categoryIds.join(",")
    try {
        const response = await axios.get<IProduct[]>(`${PRODUCT_URL}/filter_by_categories?categories=${query}`)

        return response.data
    } catch(error) {
        console.log("Error in 'getProductsByCategoriesHttp' ", error)
    }
}

export const getProductsByPriceRangeHttp = async(minPrice: string, maxPrice: string): Promise<IProduct[] | undefined> => {
    try {
        if (minPrice === '' && maxPrice === '') {
            const response = await getProductsHttp()

            return response
        }
        
        const response = await axios.get<IProduct[]>(`${PRODUCT_URL}/filter_by_price_range?min=${minPrice}&max=${maxPrice}`)

        return response.data
    } catch (error) {
        console.log("Error in 'getProductsByCategoriesHttp' ", error)
    }
}

export const createProductHttp = async(body: FormData): Promise<IProduct | undefined> => {
    try {
        const response = await axios.post<IProduct>(PRODUCT_URL, body)

        return response.data;
    } catch (error) {
        console.log("Error in 'getProductsHttp' ", error)
    }
}

export const updateProductHttp = async (body: Partial<IProduct>, productId: number): Promise<IProduct | undefined> => {
    try {
        const updatedProduct = await axios.put<IProduct>(`${PRODUCT_URL}/${productId}`, body)

        return updatedProduct.data;
    } catch (error) {
        console.log("Error in 'updateProductHttp' ", error)
    }
}

export const updateImageProductHttp = async (image: FormData, productId: number): Promise<IProduct | undefined> => {
    try {
        const updatedProduct = await axios.put<IProduct>(`${PRODUCT_URL}/update_image/${productId}`, image)

        return updatedProduct.data;
    } catch (error) {
        console.log("Error in 'updateImageProductHttp' ", error)
    }
}

export const updateCategoriesHttp = async (categories: ICategory[], productId: number): Promise<IProduct | undefined> => {
    try {
        const response = await axios.put<IProduct>(`${PRODUCT_URL}/update_categories/${productId}`, { categories})

        return response.data;
    } catch (error) {
        console.log("Error in 'updateCategoriesHttp' ", error)
    }
}


export const deleteProductHttp = async(productId: number): Promise<void> => {
    try {
        await axios.delete<IProduct>(`${PRODUCT_URL}/${productId}`)
    } catch (error) {
        console.log("Error in 'deleteProductHttp' ", error)
    }
}