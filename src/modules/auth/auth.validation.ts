import { z } from "zod";

const authSchema = z.object({
    image: z.string(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    password: z.string().min(5).max(20),
});

export const authValidation = {
    authSchema,
}