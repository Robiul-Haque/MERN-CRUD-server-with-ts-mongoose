import jwt from "jsonwebtoken";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";

const signInIntoDB = async (payload: TLoginUser) => {
    const { email, password } = payload || undefined;

    if (!email || !password) {
        throw new Error("Name and password are required");
    }

    const PasswordMatch = await User.isPasswordMatch(email, password);

    if (!PasswordMatch) {
        throw new Error("Password is did not match");
    }

    if (PasswordMatch) {
        const isUserExist = await User.findOne({ email }).select('-_id -image -phone -password -createdAt -updatedAt -__v');

        const accessToken = jwt.sign({ name: isUserExist?.name, email: isUserExist?.email }, config.JWT_SECRET as string, { expiresIn: config.JWT_EXPIRE_TIME });
        return { accessToken };
    }
}

export const authService = {
    signInIntoDB
}