import { TUser } from "./user.interface";
import { User } from "./user.model";

const signUpIntoDB = async (payload: TUser) => {
    const result = await User.create(payload);
    return result;
}

const getSingleUserIntoDB = async (payload: string) => {
    const result = await User.findOne({ email: payload });
    return result;
}

export const userService = {
    signUpIntoDB,
    getSingleUserIntoDB,
}