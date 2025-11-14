import { IUser } from "./user";

export interface IAddress {
    id?: number;
    particularAddress: string;
    city: string;
    province: string;
    country: string;
    userId?: number; // Foreign key to User
    user?: IUser; // Optional relationship with User
}