import { Response } from "express";

type TApiResponse<T> = {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}

const sendResponse = <T>(res: Response, { statusCode, success, message, data }: TApiResponse<T>) => {
    res.status(statusCode).json({
        success,
        message,
        data: data,
    })
}

export default sendResponse;