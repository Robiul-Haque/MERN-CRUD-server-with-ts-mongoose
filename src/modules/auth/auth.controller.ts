import { Request, Response } from 'express';
import { authService } from "./auth.service";

const signIn = async (req: Request, res: Response) => {
    const loginData = req.query;
    const result = await authService.signInIntoDB(loginData);
    return result;
}

export const authController = {
    signIn,
};
