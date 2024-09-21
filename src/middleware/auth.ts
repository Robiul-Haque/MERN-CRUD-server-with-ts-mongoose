import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/appError";
import httpStatus from "http-status";

const auth = (role: string) => {
    // console.log(role);

    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
        }

        const decoded = jwt.verify(token, config.jwt_access_key as string) as JwtPayload;
        const { email } = decoded;

        const user = await User.findOne({ email });
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found");
        }

        next();
    });
}

export default auth;