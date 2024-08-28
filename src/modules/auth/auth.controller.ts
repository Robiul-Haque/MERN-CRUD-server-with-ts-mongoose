import { Request, Response } from 'express'; // Assuming express is used for handling requests
import { authService } from "./auth.service";

const signIn = async (req: Request, res: Response) => {
    const loginData = req.query;
    const result = await authService.signInIntoDB(loginData);

    // const { name, email, password } = req.body as { name?: string, email?: string, password: string };
    // if (name) {
    //     const result = await authService.loginUserWithDB(name, password);
    // } else if (email) {
    //     const result = await authService.loginUserWithDB(email, password);
    // }
}

export const authController = {
    signIn,
};
