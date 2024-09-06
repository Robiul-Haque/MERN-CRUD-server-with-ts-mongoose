import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import { createToken } from "./auth.utils";

const signInIntoDB = async (payload: TLoginUser) => {
    const { email, password } = payload || undefined;

    if (!email || !password) {
        throw new Error("Name and password are required");
    }

    const PasswordMatch = await User.isPasswordMatch(email, password);
    if (!PasswordMatch) {
        throw new Error("Password is did not match");
    }

    const accessToken = createToken({ email: payload.email || '' }, config.jwt_access_key as string, config.jwt_access_expire_in as string);
    const refreshToken = createToken({ email: payload.email || '' }, config.jwt_refresh_key as string, config.jwt_refresh_expire_in as string);

    return { accessToken, refreshToken };
}

const refreshToken = async (token: string) => {
    if (!token) {
        throw new Error('Token not provided');
    }
    const decoded = jwt.verify(token, config.jwt_refresh_key as string) as JwtPayload;
    const { email, iat, exp } = decoded;

    const accessToken = createToken({ email: email || '' }, config.jwt_access_key as string, config.jwt_access_expire_in as string);
    return { accessToken };
}

export const authService = {
    signInIntoDB,
    refreshToken,
}