import { IProduct } from "./product"

export interface ICartItem {
    id?: number
    userId?: number
    productId?: number
    product: IProduct
}