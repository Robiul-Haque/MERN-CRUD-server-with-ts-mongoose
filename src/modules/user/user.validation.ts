import { z } from "zod";

const userSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        password: z.string().min(5).max(20),
    })
});

const updateUserSchema = z.object({
    body: z.object({
        name: z.string(),
        phone: z.string().optional(),
    })
});

export const userValidation = {
    userSchema,
    updateUserSchema,
}