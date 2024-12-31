import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { TUser } from "./user.interface";

const signUp: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const img = req.file;
    const newUserData = req.body;
    const result = await userService.signUpIntoDB(img, newUserData as TUser);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data create successfully!",
        data: result
    });
});

const getSingleUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const userEmail = req.params?.email;
    const result = await userService.getSingleUserIntoDB(userEmail);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data featch successfully!",
        data: result
    });
});

const updateSingleUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const userEmail = req.params?.email;
    const img = req.file;
    const updateUserData = req.body;
    const result = await userService.updateSingleUserIntoDB(userEmail, img, updateUserData as TUser);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data update successfully!",
        data: result,
    });
});

export const userController = {
    signUp,
    getSingleUser,
    updateSingleUser,
}