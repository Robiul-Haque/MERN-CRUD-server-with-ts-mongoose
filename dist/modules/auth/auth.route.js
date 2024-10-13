"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post('/sign-in', auth_controller_1.authController.signIn);
router.post('/refresh-token', auth_controller_1.authController.refreshToken);
router.post('/forget-password/:email', auth_controller_1.authController.forgetPassword);
router.post('/reset-password/:token', auth_controller_1.authController.resetPassword);
exports.authRoutes = router;
