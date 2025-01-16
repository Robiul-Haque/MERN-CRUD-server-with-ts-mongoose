import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import mongoose from "mongoose";
import { uploadImageToCloudinary } from "../../utils/handleImageToCloudinary";
import { updateImageOnCloudinary } from "../../utils/handleUpdateImageToCloudinary";

const signUpIntoDB = async (img: any, payload: TUser) => {
    // Check if a user with the given email already exists in the database throw an error.
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Email already exists try another email address");
    }

    // Start MongoDB session.
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        if (img) {
            const imagePath = img?.path;
            const imgName = imagePath.split("/").pop()?.split(".")[0] || "";
            const { public_id, secure_url } = await uploadImageToCloudinary(imgName, imagePath) as { public_id: string, secure_url: string };

            // Add the uploaded image's URL and public ID to the user payload.
            payload.image = {
                url: secure_url,
                publicId: public_id,
            };
        }

        const res = await User.create(payload);
        return res;
    }
    catch (err) {
        // Abort the transaction and end the session in case of an error.
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err as any);
    }
}

const getSingleUserIntoDB = async (email: string) => {
    // Fetch a single user from the database by their email.
    const res = await User.findOne({ email });
    return res;
}

const updateSingleUserIntoDB = async (email: string, img: any, payload: TUser) => {
    // Start a MongoDB session.
    const session = await mongoose.startSession();
    try {
        // Begin the transaction.
        session.startTransaction();

        // If a new image is provided, upload and replace the existing image.
        if (img) {
            const data = await User.findOne({ email });
            const imagePath = img?.path;
            const imgName = imagePath.split("/").pop()?.split(".")[0] || "";
            // Update the image on Cloudinary and get the new image details.
            const { public_id, secure_url } = await updateImageOnCloudinary(imgName, imagePath, data?.image?.publicId as string) as { public_id: string, secure_url: string };

            // Update the user image details with the new image details.
            payload.image = { url: secure_url, publicId: public_id };
        }

        const res = await User.findOneAndUpdate({ email }, payload, { new: true });
        return res;
    }
    catch (err) {
        // Abort the transaction and end the session in case of an error.
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err as any);
    }
}

export const userService = {
    signUpIntoDB,
    getSingleUserIntoDB,
    updateSingleUserIntoDB,
}