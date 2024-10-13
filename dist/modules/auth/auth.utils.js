"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (payload, jwt_secret, expiresIn) => {
    return jsonwebtoken_1.default.sign({ email: payload === null || payload === void 0 ? void 0 : payload.email }, jwt_secret, { expiresIn });
};
exports.createToken = createToken;
