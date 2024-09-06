import jwt from "jsonwebtoken";

export const createToken = (payload: { email: string }, jwt_secret: string, expiresIn: string) => {
    return jwt.sign({ email: payload?.email }, jwt_secret, { expiresIn });
}