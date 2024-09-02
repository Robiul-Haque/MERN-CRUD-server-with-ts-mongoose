import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const signInIntoDB = async (payload: TLoginUser) => {
    if (!payload?.email || !payload?.password) {
        throw new Error("Name and password are required");
    }

    const PasswordMatch = await User.isPasswordMatch(payload.email, payload.password);

    if (!PasswordMatch) {
        throw new Error("Password is did not match");
    }

    if (PasswordMatch) {
        const isUserExist = await User.findOne({ email: payload?.email }).select('-_id -image -phone -password -createdAt -updatedAt -__v');
        return isUserExist;
    }
}

export const authService = {
    signInIntoDB
}