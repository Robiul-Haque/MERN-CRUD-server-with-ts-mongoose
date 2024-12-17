import { z } from "zod";

const crudSchema = z.object({
    body: z.object({
        name: z.string(),
        phone: z.string().optional(),
        email: z.string().optional(),
        description: z.string().optional(),
        priority: z.enum(["High", "Medium", "Low"]),
    })
});

export const crudValidation = {
    crudSchema,
}