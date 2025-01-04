import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import { createToken } from "./auth.utils";
import nodemailer from "nodemailer";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import crypto from 'crypto';

const signInIntoDB = async (payload: TLoginUser) => {
    const { email, password } = payload;

    if (!email || !password) {
        throw new AppError(httpStatus.NOT_FOUND, "Name and password are required");
    }

    const PasswordMatch = await User.isPasswordMatch(email, password);
    if (!PasswordMatch) {
        throw new AppError(httpStatus.NOT_FOUND, "Password is did not match");
    }

    const accessToken = createToken({ email: payload.email || '' }, config.jwt_access_key as string, config.jwt_access_expire_in as string);
    const refreshToken = createToken({ email: payload.email || '' }, config.jwt_refresh_key as string, config.jwt_refresh_expire_in as string);

    return { accessToken, refreshToken };
}
const forgetPasswordWithTokenAndLink = async (email: string) => {
    const user = await User.isUserExist(email);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    // Send email with reset password link
    // const accessToken = createToken({ email }, config.jwt_access_key as string, config.forget_email_jwt_access_expire_in as string);
    // const resetPasswordLink = `http://localhost:8000/api/v1/auth/reset-password/${accessToken}`;

    const otp = crypto.randomInt(100000, 999999); // Generates a 6-digit OTP
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes from now

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'robiulcoc430@gmail.com',
            pass: 'drjb amtw zvso ylgi',
        },
    });

    const mailOptions = {
        from: 'robiulcoc430@gmail.com',
        to: [email],
        subject: 'Crud Account Forget Password',
        text: `Your OTP for password reset is ${otp}. It will expire in 5 minutes.`,
    };
    transporter.sendMail(mailOptions, function (error) {
        if (error) throw new AppError(httpStatus.NOT_FOUND, error.message);
    });
}

const resetPasswordWithToken = async (token: string, password: string) => {
    const decodedUserEmail = await User.isTokenValid(token);
    // Update password in DB
    await User.findOneAndUpdate({ email: decodedUserEmail }, { password });
    const res = await User.findOne({ email: decodedUserEmail });
    return res;
}

const refreshToken = async (token: string) => {
    if (!token) {
        throw new AppError(httpStatus.NOT_FOUND, "Token not provided");
    }
    const decoded = jwt.verify(token, config.jwt_refresh_key as string) as JwtPayload;
    const { email } = decoded;

    const accessToken = createToken({ email: email || '' }, config.jwt_access_key as string, config.jwt_access_expire_in as string);
    return { accessToken };
}

export const authService = {
    signInIntoDB,
    forgetPasswordWithTokenAndLink,
    resetPasswordWithToken,
    refreshToken,
}
