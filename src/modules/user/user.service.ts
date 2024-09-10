import { TUser } from "./user.interface";
import { User } from "./user.model";

const signUpIntoDB = async (payload: TUser) => {
    const res = await User.create(payload);
    return res;
}

const getSingleUserIntoDB = async (payload: string) => {
    const res = await User.findOne({ email: payload });
    return res;
}

export const userService = {
    signUpIntoDB,
    getSingleUserIntoDB,
}