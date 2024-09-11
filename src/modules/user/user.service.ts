import { TUser } from "./user.interface";
import { User } from "./user.model";

const signUpIntoDB = async (payload: TUser) => {
    const res = await User.create(payload);
    return res;
}

const getSingleUserIntoDB = async (email: string) => {
    const res = await User.findOne({ email });
    return res;
}

const getSingleUserForUpdateIntoDB = async (email: string) => {
    const res = await User.findOne({ email });
    return res;
}

export const userService = {
    signUpIntoDB,
    getSingleUserIntoDB,
    getSingleUserForUpdateIntoDB,
}