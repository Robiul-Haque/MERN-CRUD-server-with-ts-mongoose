import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import config from "../config";
import AppError from '../errors/appError';
import httpStatus from 'http-status';

// Cloudinary configration
cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_key,
});

export const uploadImageToCloudinary = async (imgName: string, imgPath: string) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            imgPath,
            {
                public_id: imgName, // Set the name of the uploaded file
                folder: "Mern-crud", // Specify the folder in Cloudinary
            },
            (err, result) => {
                if (err) reject(err);
                resolve(result as UploadApiResponse);
            }
        );
    });
}