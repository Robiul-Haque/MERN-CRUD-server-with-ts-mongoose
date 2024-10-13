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
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errors/appError"));
const user_model_1 = require("./user.model");
const fs_1 = __importDefault(require("fs"));
const signUpIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.User.create(payload);
    return res;
});
const getSingleUserIntoDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.User.findOne({ email });
    return res;
});
const getSingleUserForUpdateIntoDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.User.findOne({ email });
    return res;
});
const updateSingerUserIntoDB = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.User.findOne({ email });
    if (data === null || data === void 0 ? void 0 : data.image) {
        fs_1.default.unlink(`public/uploads/${data === null || data === void 0 ? void 0 : data.image}`, err => {
            if (err) {
                throw new appError_1.default(http_status_1.default.NOT_FOUND, `Error updating file ${err}`);
            }
        });
    }
    const isUpdate = yield user_model_1.User.findOneAndUpdate({ email }, payload);
    if (isUpdate) {
        const res = yield user_model_1.User.findOne({ email });
        return res;
    }
});
exports.userService = {
    signUpIntoDB,
    getSingleUserIntoDB,
    getSingleUserForUpdateIntoDB,
    updateSingerUserIntoDB,
};
