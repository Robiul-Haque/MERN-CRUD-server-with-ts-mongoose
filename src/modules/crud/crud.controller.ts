import { Request, RequestHandler, Response } from "express";
import { crudService } from "./crud.service";
import { TCrud } from "./crud.interface";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createCrud: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const img = req.file;
    const newCrudData = req.body;
    const result = await crudService.createCrudIntoDB(img, newCrudData as unknown as TCrud);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data create successfully!",
        data: result
    })
});

const getAllCruds: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const result = await crudService.getAllCrudsFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data fetch successfully!",
        data: result
    });
});

const getSingleCrud: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await crudService.getSingleCrudFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data fetch successfully!",
        data: result
    });
});

const updateCrud: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const img = req.file;
    const updateCrudData = req.body;
    const result = await crudService.updateCrudIntoDB(id, img, updateCrudData as unknown as TCrud);
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
    getAllCruds,
    getSingleCrud,
    updateCrud,
    deleteCrud,
}