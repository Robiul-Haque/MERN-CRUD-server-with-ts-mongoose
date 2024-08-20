import { Request, RequestHandler, Response } from "express";
import { userService } from "./todo.service";
import { TUser } from "./todo.interface";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const newData = req.body.userInfo;
    const result = await userService.createUserIntoIntoDB(newData as unknown as TUser);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Data create successfully!", data: result })
})

export const userController = {
    createUser,
}