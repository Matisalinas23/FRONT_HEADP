import { IAddress } from "./address";
import { IProfileIcon } from "./profileIcon";
import { IPurchaseOrder } from "./purchaseOrder";

type Enum = "CLIENT" | "ADMIN"

export interface IUser {
    id?: number,
    name: string,
    lastname: string,
    email: string,
    password: string,
    dni: string,
    birthday: string,
    type?: Enum
    address?: IAddress | null,
    profileIcon?: IProfileIcon | null,
    purchaseOrders: IPurchaseOrder[]
}