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
exports.crudController = void 0;
const crud_service_1 = require("./crud.service");
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createCrud = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const newCrudData = {
        image: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
        name: (_b = req.body) === null || _b === void 0 ? void 0 : _b.name,
        phone: (_c = req.body) === null || _c === void 0 ? void 0 : _c.phone,
        email: (_d = req.body) === null || _d === void 0 ? void 0 : _d.email,
        description: (_e = req.body) === null || _e === void 0 ? void 0 : _e.description,
        priority: (_f = req.body) === null || _f === void 0 ? void 0 : _f.priority,
    };
    const result = yield crud_service_1.crudService.createCrudIntoDB(newCrudData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Data create successfully!",
        data: result
    });
}));
const getAllCruds = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield crud_service_1.crudService.getAllCrudsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Data fetch successfully!",
        data: result
    });
}));
const updateCrud = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    const updateCrudData = {
        image: (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename,
        name: (_c = req.body) === null || _c === void 0 ? void 0 : _c.name,
        phone: (_d = req.body) === null || _d === void 0 ? void 0 : _d.phone,
        email: (_e = req.body) === null || _e === void 0 ? void 0 : _e.email,
        description: (_f = req.body) === null || _f === void 0 ? void 0 : _f.description,
        priority: (_g = req.body) === null || _g === void 0 ? void 0 : _g.priority,
    };
    const result = yield crud_service_1.crudService.updateCrudIntoDB(id, updateCrudData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Data update successfully!",
        data: result
    });
}));
const deleteCrud = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield crud_service_1.crudService.deleteCrudIntoDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Data delete successfully!",
        data: result
    });
}));
exports.crudController = {
    createCrud,
    getAllCruds,
    updateCrud,
    deleteCrud,
};
