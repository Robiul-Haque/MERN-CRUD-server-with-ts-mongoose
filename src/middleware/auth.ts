import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import config from "../config";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/appError";
import httpStatus from "http-status";

// Middleware to handle token authentication
const auth = (role: string) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        
        if (!token) throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized.....");

        try {
            const { email } = jwt.verify(token, config.jwt_access_key as string) as JwtPayload;

            const user = await User.findOne({ email });
            if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

            next();
        } catch (error) {
            if (error instanceof TokenExpiredError) throw new AppError(httpStatus.UNAUTHORIZED, "Token has expired. Please login again.");
        }
    });
}

export default auth;