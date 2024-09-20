import { z } from "zod";

export const userValidationSchema = z.object({
    image: z.string().url(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    password: z.string().min(5).max(20),
});