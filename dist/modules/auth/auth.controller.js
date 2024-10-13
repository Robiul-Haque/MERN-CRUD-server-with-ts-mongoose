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
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const config_1 = __importDefault(require("../../config"));
const signIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = req.query;
    const result = yield auth_service_1.authService.signInIntoDB(loginData);
    if (result) {
        res.cookie('refreshToken', result === null || result === void 0 ? void 0 : result.refreshToken, {
            secure: config_1.default.node_env === 'production',
            httpOnly: true,
        });
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "User Login successfully!",
            data: result
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: "User not found",
            data: null
        });
    }
}));
const forgetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const email = (_a = req.params) === null || _a === void 0 ? void 0 : _a.email;
    yield auth_service_1.authService.forgetPasswordWithTokenAndLink(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Forget password link genareted check your email!",
        data: ""
    });
}));
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = (_a = req.params) === null || _a === void 0 ? void 0 : _a.token;
    const newPassword = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password;
    const result = yield auth_service_1.authService.resetPasswordWithToken(token, newPassword);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Password update successfully!",
        data: result
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.authService.refreshToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Access token is retrieved successfully!",
        data: result
    });
}));
exports.authController = {
    signIn,
    forgetPassword,
    resetPassword,
    refreshToken,
};
