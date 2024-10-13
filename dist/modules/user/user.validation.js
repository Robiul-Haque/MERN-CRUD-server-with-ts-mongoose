"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        phone: zod_1.z.string().optional(),
        password: zod_1.z.string().min(5).max(20),
    })
});
const updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        phone: zod_1.z.string().optional(),
    })
});
exports.userValidation = {
    userSchema,
    updateUserSchema,
};
