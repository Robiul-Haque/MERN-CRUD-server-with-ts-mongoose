import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { TUser } from "./user.interface";
import { UserValidation } from "./user.validation";

const signUp: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const userData = {
        image: req.file?.filename,
        name: req.body?.name,
        email: req.body?.email,
        phone: req.body?.phone,
        password: req.body?.password,
    }
    const validateData = UserValidation.userSchema.parse(userData);
    console.log('validate from controller', validateData);
    // console.log('from controller', userData);

    // const result = await userService.signUpIntoDB(newUserData as TUser);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data create successfully!",
        data: 'result'
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
    const updateUserData = {
        image: req.file?.filename,
        name: req.body?.name,
        phone: req.body?.phone,
    }
    const result = await userService.updateSingerUserIntoDB(userEmail, updateUserData as TUser);
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