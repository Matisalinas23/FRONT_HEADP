import { IProduct } from "./product"
import { IReceipt } from "./receipt"

export interface IReceiptItem {
  id?: number
  quantity: number
  price: number
  receiptId?: number
  receipt?: IReceipt
  productId?: number
  product?: IProduct
}