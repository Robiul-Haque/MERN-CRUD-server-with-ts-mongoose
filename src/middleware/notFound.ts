import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

// Middleware to handle "Not Found" errors
const notFound = (req: Request, res: Response, next: NextFunction) => {
    return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Not found',
        error: null
    })
}

export default notFound;