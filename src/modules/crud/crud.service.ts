import { TCrud } from "./crud.interface";
import { Crud } from "./crud.model";
import AppError from "../../errors/appError";
import mongoose from "mongoose";
import { uploadImageToCloudinary } from "../../utils/handleImageToCloudinary";
import { updateImageOnCloudinary } from "../../utils/handleUpdateImageToCloudinary";
import { deleteImageOnCloudinary } from "../../utils/handleDeleteImageToCloudinary";

const createCrudIntoDB = async (img: any, payload: TCrud) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        if (img) {
            const imagePath = img?.path;
            const imgName = imagePath.split("/").pop()?.split(".")[0] || "";
            // Upload image to cloudinary & database
            const { public_id, secure_url } = await uploadImageToCloudinary(imgName, imagePath) as { public_id: string, secure_url: string };

            payload.image = {
                url: secure_url,
                publicId: public_id,
            };
        }
        const res = await Crud.create(payload);
        return res;
    }
    catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, err as any);
    }
}

const getAllCrudsFromDB = async () => {
    const res = await Crud.find();
    return res;
}

const getSingleCrudFromDB = async (id: string) => {
    const res = await Crud.findById(id);
    return res;
}

const updateCrudIntoDB = async (id: string, img: any, payload: TCrud) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        if (img) {
            const data = await Crud.findById(id);
            const imagePath = img?.path;
            const imgName = imagePath.split("/").pop()?.split(".")[0] || "";
            // Update image from cloudinary & database
            const { public_id, secure_url } = await updateImageOnCloudinary(imgName, imagePath, data?.image?.publicId as string) as { public_id: string, secure_url: string };

            payload.image = {
                url: secure_url,
                publicId: public_id
            };
        }
        await Crud.findByIdAndUpdate(id, payload, { new: true });
        const res = await Crud.findById(id);
        return res;
    }
    catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, err as any);
    }
}

const deleteCrudIntoDB = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const data = await Crud.findById(id);
        if (!data) throw new AppError(400, "User not found!");
        // Delete image from cloudinary & database
        await deleteImageOnCloudinary(data?.image?.publicId as string);
        const res = await Crud.findByIdAndDelete(id);
        return res;
    }
    catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, err as any);
    }
}

export const crudService = {
    createCrudIntoDB,
    getAllCrudsFromDB,
    getSingleCrudFromDB,
    updateCrudIntoDB,
    deleteCrudIntoDB,
}