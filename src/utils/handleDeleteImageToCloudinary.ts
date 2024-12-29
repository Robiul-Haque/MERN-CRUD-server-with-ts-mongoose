import { v2 as cloudinary } from 'cloudinary';
import AppError from '../errors/appError';

export const deleteImageOnCloudinary = async (publicId: string) => {
    // 3. Delete the image from Cloudinary using the publicId
    cloudinary.uploader.destroy(publicId, function (err, result) {
        if (err) throw new AppError(500, `Failed to delete image from Cloudinary: ${err.message}`);
        return result;
    });
};