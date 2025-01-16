import jwt from "jsonwebtoken";

// Generates a JSON Web Token (JWT) for the given payload.
export const createToken = (payload: { email: string }, jwt_secret: string, expiresIn: string) => {
    return jwt.sign({ email: payload?.email }, jwt_secret, { expiresIn })
}