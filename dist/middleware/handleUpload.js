"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const appError_1 = __importDefault(require("../errors/appError"));
const http_status_1 = __importDefault(require("http-status"));
const uploadPath = path_1.default.join(process.cwd(), 'public/uploads');
// Create the uploadPath if it doesn't exist yet
if (!fs_1.default.existsSync(uploadPath)) {
    fs_1.default.mkdirSync(uploadPath, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const randomSixDigit = Math.floor(100000 + Math.random() * 900000);
        const extensions = path_1.default.extname(file.originalname);
        const filename = `image-${randomSixDigit}${extensions}`;
        cb(null, filename);
    }
});
const uploadImg = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        }
        else {
            cb(null, false);
            throw new appError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Only JPG and PNG images are allowed");
        }
    }
});
exports.default = uploadImg;
