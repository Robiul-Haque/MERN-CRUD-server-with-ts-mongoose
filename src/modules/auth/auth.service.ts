import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import { createToken } from "./auth.utils";
import nodemailer from "nodemailer";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import crypto from 'crypto';
import bcrypt from "bcrypt";

const signInIntoDB = async (payload: TLoginUser) => {
    const { email, password } = payload;

    if (!email || !password) {
        throw new AppError(httpStatus.NOT_FOUND, "Name and password are required");
    }

    const passwordMatch = await User.isPasswordMatch(email, password);
    if (!passwordMatch) {
        throw new AppError(httpStatus.NOT_FOUND, "Password is did not match");
    }

    const accessToken = createToken({ email: payload.email || '' }, config.jwt_access_key as string, config.jwt_access_expire_in as string);
    const refreshToken = createToken({ email: payload.email || '' }, config.jwt_refresh_key as string, config.jwt_refresh_expire_in as string);

    return { accessToken, refreshToken };
}

const forgetPasswordWithOtp = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const otp = crypto.randomInt(100000, 999999); // Generates a 6-digit OTP

    // Send email with OTP code
    const transporter = nodemailer.createTransport({
        service: config.email_service,
        host: config.email_host,
        auth: {
            user: config.email_user,
            pass: config.email_password,
        },
    });

    const mailOptions = {
        from: config.email,
        to: [email],
        subject: 'Forget Your Password',
        text: `Your OTP code ${otp}`,
    };
    transporter.sendMail(mailOptions, function (error) {
        if (error) throw new AppError(httpStatus.NOT_FOUND, error.message);
    });

    // Save OTP in DB
    await User.findOneAndUpdate({ email }, { otp });
}

const verifyOtp = async (email: string, otp: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    if (user.otp !== otp) {
        throw new AppError(httpStatus.NOT_FOUND, "OTP is not matching");
    }

    // Delete OTP from DB
    await User.findOneAndUpdate({ email }, { otp: null });
}

const resetPassword = async (email: string, newPassword: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const hashedNewPasswword = await bcrypt.hash(newPassword, Number(config.salt_rounds));

    // Update password in DB
    await User.findOneAndUpdate({ email }, { password: hashedNewPasswword });
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
    forgetPasswordWithOtp,
    verifyOtp,
    resetPassword,
    refreshToken,
}