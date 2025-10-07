import { ICategory } from "./category"
import { IImage } from "./image"
import { ISale } from "./sale"

export interface IProduct {
    id: number
    name: string
    description: string
    price: number
    stock: number
    quantity: number
    categories: ICategory[]
    image: IImage | null
}