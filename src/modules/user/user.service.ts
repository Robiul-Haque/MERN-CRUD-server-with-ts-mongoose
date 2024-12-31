import AppError from "../../errors/appError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import mongoose from "mongoose";
import { uploadImageToCloudinary } from "../../utils/handleImageToCloudinary";
import { updateImageOnCloudinary } from "../../utils/handleUpdateImageToCloudinary";

const signUpIntoDB = async (img: any, payload: TUser) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        if (img) {
            const imagePath = img?.path;
            const imgName = imagePath.split("/").pop()?.split(".")[0] || "";
            const { public_id, secure_url } = await uploadImageToCloudinary(imgName, imagePath) as { public_id: string, secure_url: string };

            payload.image = {
                url: secure_url,
                publicId: public_id,
            };
        }
        const res = await User.create(payload);
        return res;
    }
    catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, err as any);
    }
}

const getSingleUserIntoDB = async (email: string) => {
    const res = await User.findOne({ email });
    return res;
}

const updateSingleUserIntoDB = async (email: string, img: any, payload: TUser) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        if (img) {
            const data = await User.findOne({ email });
            const imagePath = img?.path;
            const imgName = imagePath.split("/").pop()?.split(".")[0] || "";
            const { public_id, secure_url } = await updateImageOnCloudinary(imgName, imagePath, data?.image?.publicId as string) as { public_id: string, secure_url: string };
            payload.image = { url: secure_url, publicId: public_id };
        }
        await User.findOneAndUpdate({ email }, payload, { new: true });
        const res = await User.findOne({ email });
        return res;
    }
    catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, err as any);
    }
}

export const userService = {
    signUpIntoDB,
    getSingleUserIntoDB,
    updateSingleUserIntoDB,
}