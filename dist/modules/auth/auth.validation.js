"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const authSchema = zod_1.z.object({
    image: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().optional(),
    password: zod_1.z.string().min(5).max(20),
});
exports.authValidation = {
    authSchema,
};
