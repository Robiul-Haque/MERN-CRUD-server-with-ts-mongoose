"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../user/user.model");
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("./auth.utils");
const nodemailer_1 = __importDefault(require("nodemailer"));
const appError_1 = __importDefault(require("../../errors/appError"));
const http_status_1 = __importDefault(require("http-status"));
const signInIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    if (!email || !password) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Name and password are required");
    }
    const PasswordMatch = yield user_model_1.User.isPasswordMatch(email, password);
    if (!PasswordMatch) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Password is did not match");
    }
    const accessToken = (0, auth_utils_1.createToken)({ email: payload.email || '' }, config_1.default.jwt_access_key, config_1.default.jwt_access_expire_in);
    const refreshToken = (0, auth_utils_1.createToken)({ email: payload.email || '' }, config_1.default.jwt_refresh_key, config_1.default.jwt_refresh_expire_in);
    return { accessToken, refreshToken };
});
const forgetPasswordWithTokenAndLink = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExist(email);
    if (!user) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Send email with reset password link
    const accessToken = (0, auth_utils_1.createToken)({ email }, config_1.default.jwt_access_key, config_1.default.forget_email_jwt_access_expire_in);
    const resetPasswordLink = `http://localhost:8000/api/v1/auth/reset-password/${accessToken}`;
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'robiulcoc430@gmail.com',
            pass: 'drjb amtw zvso ylgi',
        },
    });
    const mailOptions = {
        from: 'robiulcoc430@gmail.com',
        to: [email],
        subject: 'Crud Account Forget Password',
        html: `
            <h1 style="color:red; text-align:center">Reset Password</h1>
            <p style="text-align:center">Click the following link to reset your password: <a href="${resetPasswordLink}">Reset Password</a></p>
        `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, error.message);
        }
    });
    if (!resetPasswordLink) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Reset password link not found!");
    }
});
const resetPasswordWithToken = (token, password) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedUserEmail = yield user_model_1.User.isTokenValid(token);
    // Update password in DB
    yield user_model_1.User.findOneAndUpdate({ email: decodedUserEmail }, { password });
    const res = yield user_model_1.User.findOne({ email: decodedUserEmail });
    return res;
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Token not provided");
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_key);
    const { email } = decoded;
    const accessToken = (0, auth_utils_1.createToken)({ email: email || '' }, config_1.default.jwt_access_key, config_1.default.jwt_access_expire_in);
    return { accessToken };
});
exports.authService = {
    signInIntoDB,
    forgetPasswordWithTokenAndLink,
    resetPasswordWithToken,
    refreshToken,
};
