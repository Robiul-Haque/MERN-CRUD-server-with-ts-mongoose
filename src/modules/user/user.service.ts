import config from "../../config";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";

const signUpIntoDB = async (payload: TUser) => {
    payload.password = await bcrypt.hash(
        payload.password,
        Number(config.SALT_ROUNDS),
    );

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