import { NextFunction, Request, Response } from "express";
import AppError from "../errors/appError";
import catchAsync from "../utils/catchAsync";

const bodyParser = catchAsync((req: Request, res: Response, next: NextFunction) => {
    if (!req.body.data) throw new AppError(400, 'Please provide data in the body under data key');
    req.body = JSON.parse(req.body.data);

    next();
});

export default bodyParser;