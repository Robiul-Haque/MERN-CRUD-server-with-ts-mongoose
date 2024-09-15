import multer from "multer";
import path from 'path';
import fs from 'fs';
import AppError from "../errors/appError";
import httpStatus from "http-status";

const uploadPath = path.join(process.cwd(), 'public/uploads');
// Create the uploadPath if it doesn't exist yet
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const randomSixDigit = Math.floor(100000 + Math.random() * 900000);
        const extensions = path.extname(file.originalname);
        const filename = `image-${randomSixDigit}${extensions}`;
        cb(null, filename);
    }
})

const uploadImg = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(null, false);
            throw new AppError(httpStatus.NOT_ACCEPTABLE, "Only JPG and PNG images are allowed");
        }
    }
})

export default uploadImg;