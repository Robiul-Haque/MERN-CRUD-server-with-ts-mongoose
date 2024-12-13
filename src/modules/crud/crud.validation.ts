import { z } from "zod";

const crudSchema = z.object({
    body: z.object({
        name: z.string(),
        phone: z.string().optional(),
        email: z.string().email().optional(),
        description: z.string().min(1).max(225).optional(),
        priority: z.enum(["High", "Medium", "Low"]),
    })
});

export const crudValidation = {
    crudSchema,
}