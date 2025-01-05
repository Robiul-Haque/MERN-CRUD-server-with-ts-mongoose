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

    const PasswordMatch = await User.isPasswordMatch(email, password);
    if (!PasswordMatch) {
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
    // const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes from now

    // Delete all previous OTPs for same user
    // await Otp.deleteOne({ userId: user._id });

    // Save OTP in DB
    // await Otp.create({ userId: user._id, otp, expiresAt, isUsed: false });

    // Send email with OTP code
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
        subject: 'Forget Your Password',
        text: `Your OTP for password reset is ${otp}. It will expire in 5 minutes.`,
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

    return true;

    // await bcrypt.hash(this.password,Number(config.salt_rounds));

    // const verifyOtp = await Otp.findOne({ userId: user._id });
    // console.log("Verifying: ", verifyOtp);

    // if (verifyOtp?.otp === otp && verifyOtp?.expiresAt.getTime() < Date.now()) {
    //     console.log(verifyOtp?.expiresAt.getTime() < Date.now());
    // }
}

const resetPassword = async (email: string, newPassword: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const hashedNewPasswword = await bcrypt.hash(newPassword, Number(config.salt_rounds));

    // Update password in DB
    await User.findOneAndUpdate({ email }, { password: hashedNewPasswword }, { new: true, runValidators: true });
    return true;
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
// Check if OTP is correct and not expired
// if (verifyOtp?.otp === otp && verifyOtp?.expiresAt.getTime() > Date.now()) {
//     console.log(verifyOtp?.expiresAt.getTime() > Date.now());
// } else {
//     throw new AppError(httpStatus.NOT_FOUND, "Invalid OTP or OTP expired");
// }
// // Delete OTP from DB after verification
// await Otp.deleteOne({ userId: user._id });
// // Save new password in DB
// await User.findOneAndUpdate({ email }, { password: bcrypt.hashSync(newPassword, 10) });
// // Generate new JWT tokens
// const accessToken = createToken({ email: user.email || '' }, config.jwt_access_key as string, config.jwt_access_expire_in as string);
// const refreshToken = createToken({ email: user.email || '' }, config.jwt_refresh_key as string, config.jwt_refresh_expire_in as string);
// return { accessToken, refreshToken };
// // return { accessToken, refreshToken };