import { Request, Response } from 'express';
import { authService } from "./auth.service";
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import config from '../../config';

const signIn = catchAsync(async (req: Request, res: Response) => {
    const loginData = req.query;
    const result = await authService.signInIntoDB(loginData);
    if (result) {
        res.cookie('refreshToken', result?.refreshToken, {
            secure: config.node_env === 'production',
            httpOnly: true,
        });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User Login successfully!",
            data: result
        });
    } else {
        sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: "User not found",
            data: null
        });
    }
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
    const email = req.params?.email;
    const result = await authService.forgetPasswordWithOtp(email);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Send OTP code check your email!",
        data: result
    });
});

const verifyOtp = catchAsync(async (req: Request, res: Response) => {
    const email = req.body?.email;
    const otp = req.body?.otp;
    await authService.verifyOtp(email, otp);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "OTP verified successfully",
        data: ""
    });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const email = req.body?.email;
    const newPassword = req.body?.password;
    await authService.resetPassword(email, newPassword);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password update successfully!",
        data: ""
    });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await authService.refreshToken(refreshToken);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Access token is retrieved successfully!",
        data: result
    });
});

export const authController = {
    signIn,
    forgetPassword,
    resetPassword,
    verifyOtp,
    refreshToken,
};
