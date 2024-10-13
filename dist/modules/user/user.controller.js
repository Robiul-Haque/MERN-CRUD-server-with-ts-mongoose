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
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const signUp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const newUserData = {
        image: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
        name: (_b = req.body) === null || _b === void 0 ? void 0 : _b.name,
        email: (_c = req.body) === null || _c === void 0 ? void 0 : _c.email,
        phone: (_d = req.body) === null || _d === void 0 ? void 0 : _d.phone,
        password: (_e = req.body) === null || _e === void 0 ? void 0 : _e.password,
    };
    const result = yield user_service_1.userService.signUpIntoDB(newUserData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Data create successfully!",
        data: 'result'
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userEmail = (_a = req.params) === null || _a === void 0 ? void 0 : _a.email;
    const result = yield user_service_1.userService.getSingleUserIntoDB(userEmail);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Data featch successfully!",
        data: result
    });
}));
const updateSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const userEmail = (_a = req.params) === null || _a === void 0 ? void 0 : _a.email;
    const updateUserData = {
        image: (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename,
        name: (_c = req.body) === null || _c === void 0 ? void 0 : _c.name,
        phone: (_d = req.body) === null || _d === void 0 ? void 0 : _d.phone,
    };
    const result = yield user_service_1.userService.updateSingerUserIntoDB(userEmail, updateUserData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Data update successfully!",
        data: result,
    });
}));
exports.userController = {
    signUp,
    getSingleUser,
    updateSingleUser,
};
