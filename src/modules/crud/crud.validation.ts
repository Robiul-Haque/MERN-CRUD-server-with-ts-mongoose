import { z } from "zod";

const crudSchema = z.object({
    image: z.string(),
    name: z.string(),
    phone: z.string().optional(),
    email: z.string().email(),
    description: z.string().min(1).max(225),
    priority: z.enum(["High", "Medium", "Low"]),
});

export const crudValidation = {
    crudSchema,
}