import { IAddress } from "./address"
import { IReceiptItem } from "./receitpItem"
import { IUser } from "./user"

export interface IReceipt {
  id?: number
  date: string
  subtotal: number
  total: number
  iva: number
  items: IReceiptItem[]
  userId?: number
  user?: IUser
  addressId?: number
  address?: IAddress
}