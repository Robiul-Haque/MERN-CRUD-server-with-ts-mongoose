import { Request, RequestHandler, Response } from "express";
import { crudService } from "./crud.service";
import { TCrud } from "./crud.interface";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createCrud: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const data = {
        image: req.file?.filename,
        name: req.body?.name,
        phone: req.body?.phone,
        email: req.body?.email,
        description: req.body?.description,
        priority: req.body?.priority,
    }
    const result = await crudService.createCrudIntoIntoDB(data as unknown as TCrud);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Data create successfully!", data: result })
})

const updateCrud = async (req: Request, res: Response) => {
    const id = req.params?.id
    const data = {
        image: req.file?.filename,
        name: req.body?.name,
        phone: req.body?.phone,
        email: req.body?.email,
        description: req.body?.description,
        priority: req.body?.priority,
    }
    const result = await crudService.updateCrudIntoIntoDB(id, data as TCrud);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Data update successfully!", data: result });
}


export const crudController = {
    createCrud,
    updateCrud,
}