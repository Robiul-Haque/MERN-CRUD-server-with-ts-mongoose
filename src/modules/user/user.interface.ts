import { Model } from "mongoose";

export type TUser = {
    image: string;
    name: string;
    email: string;
    phone?: number;
    password: string;
}

export interface IUserModel extends Model<TUser> {
    isPasswordMatch(email: string, password: string): Promise<TUser | null>
}