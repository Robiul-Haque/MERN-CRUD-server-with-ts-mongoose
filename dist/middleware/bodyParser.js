"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../errors/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const bodyParser = (0, catchAsync_1.default)((req, res, next) => {
    if (!req.body.data)
        throw new appError_1.default(400, 'Please provide data in the body under data key');
    req.body = JSON.parse(req.body.data);
    next();
});
exports.default = bodyParser;
