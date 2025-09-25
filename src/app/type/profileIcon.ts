import { IUser } from "./user";

export interface IProfileIcon {
    id?: number;
    name: string;
    url: string;
    userId?: number; // foreign key to User
    user?: IUser; // optional, for relation
}