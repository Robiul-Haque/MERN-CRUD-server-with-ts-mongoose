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
    const result = await crudService.createCrudIntoDB(data as unknown as TCrud);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data create successfully!",
        data: result
    })
});

const updateCrud: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const data = {
        image: req.file?.filename,
        name: req.body?.name,
        phone: req.body?.phone,
        email: req.body?.email,
        description: req.body?.description,
        priority: req.body?.priority,
    }
    const result = await crudService.updateCrudIntoDB(id, data as TCrud);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data update successfully!",
        data: result
    });
});

const deleteCrud: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await crudService.deleteCrudIntoDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data delete successfully!",
        data: result
    });
});


export const crudController = {
    createCrud,
    updateCrud,
    deleteCrud,
}