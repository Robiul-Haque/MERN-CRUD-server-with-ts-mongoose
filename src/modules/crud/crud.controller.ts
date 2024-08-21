import { Request, RequestHandler, Response } from "express";
import { userService } from "./crud.service";
import { TCrud } from "./crud.interface";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const newData = req.body.userInfo;
    const result = await userService.createCrudIntoIntoDB(newData as unknown as TCrud);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Data create successfully!", data: result })
})

export const crudController = {
    createUser,
}