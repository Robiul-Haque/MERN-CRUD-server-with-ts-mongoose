"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crudValidation = void 0;
const zod_1 = require("zod");
const crudSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        priority: zod_1.z.enum(["High", "Medium", "Low"]),
    })
});
exports.crudValidation = {
    crudSchema,
};
