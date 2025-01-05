import { Model } from "mongoose";

export type TUser = {
    image: {
        url: string;
        publicId: string;
    };
    name: string;
    email: string;
    phone?: string;
    password: string;
    otp?: string;
}

export interface IUserModel extends Model<TUser> {
    isPasswordMatch(email: string, password: string): Promise<string | null>
    isUserExist(email: string): Promise<string | null>
    isTokenValid(token: string): Promise<string | null>
}