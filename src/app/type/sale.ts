import { IProduct } from "./product"

export interface ISale {
    id: number
    date: Date
    productId: number
    product: IProduct
}