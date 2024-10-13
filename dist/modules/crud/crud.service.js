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
exports.crudService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const crud_model_1 = require("./crud.model");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const appError_1 = __importDefault(require("../../errors/appError"));
const createCrudIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield crud_model_1.Crud.create(payload);
    return res;
});
const getAllCrudsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield crud_model_1.Crud.find();
    return res;
});
const updateCrudIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield crud_model_1.Crud.findById(id);
    if (data === null || data === void 0 ? void 0 : data.image) {
        fs_1.default.unlink(`public/uploads/${data === null || data === void 0 ? void 0 : data.image}`, err => {
            if (err) {
                throw new appError_1.default(http_status_1.default.NOT_FOUND, `Error updating file: ${err}`);
            }
        });
    }
    const res = yield crud_model_1.Crud.findByIdAndUpdate(id, payload);
    return res;
});
const deleteCrudIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield crud_model_1.Crud.findById(id);
    if (data === null || data === void 0 ? void 0 : data.image) {
        const filePath = path_1.default.join(process.cwd(), 'public/uploads', data === null || data === void 0 ? void 0 : data.image);
        fs_1.default.unlink(filePath, err => {
            if (err) {
                throw new appError_1.default(http_status_1.default.NOT_FOUND, `Error deleting file: ${err}`);
            }
        });
    }
    const res = yield crud_model_1.Crud.findByIdAndDelete(id);
    return res;
});
exports.crudService = {
    createCrudIntoDB,
    getAllCrudsFromDB,
    updateCrudIntoDB,
    deleteCrudIntoDB,
};
