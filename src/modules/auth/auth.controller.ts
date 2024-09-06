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
}
);

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await authService.refreshToken(refreshToken);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Access token is retrieved successfully!",
        data: result
    })
});

export const authController = {
    signIn,
    refreshToken,
};
