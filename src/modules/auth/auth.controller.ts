import { Request, Response } from 'express';
import { authService } from "./auth.service";
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const signIn = async (req: Request, res: Response) => {
    const loginData = req.query;
    const result = await authService.signInIntoDB(loginData);
    if (result) {
        sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "User Login successfully!", data: result });
    } else {
        sendResponse(res, { statusCode: httpStatus.NOT_FOUND, success: false, message: "User not found", data: null });
    }
}

export const authController = {
    signIn,
};
