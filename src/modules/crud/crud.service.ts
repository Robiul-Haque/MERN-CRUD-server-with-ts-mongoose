import { TCrud } from "./crud.interface";
import { Crud } from "./crud.model";
import AppError from "../../errors/appError";
import mongoose from "mongoose";
import { uploadImageToCloudinary } from "../../utils/handleImageToCloudinary";
import { updateImageOnCloudinary } from "../../utils/handleUpdateImageToCloudinary";
import { deleteImageOnCloudinary } from "../../utils/handleDeleteImageToCloudinary";

// Service to create a new CRUD record in the database
const createCrudIntoDB = async (img: any, payload: TCrud) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        if (img) {
            const imagePath = img?.path;
            const imgName = imagePath.split("/").pop()?.split(".")[0] || "";
            // Upload the image to Cloudinary and store the URL and public ID
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
        // Rollback transaction in case of an error
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, err as any);
    }
}

// Service to fetch all CRUD records from the database
const getAllCrudsFromDB = async () => {
    const res = await Crud.find();
    return res;
}

// Service to fetch a single CRUD record by its ID
const getSingleCrudFromDB = async (id: string) => {
    const res = await Crud.findById(id);
    return res;
}

// Service to update an existing CRUD record in the database
const updateCrudIntoDB = async (id: string, img: any, payload: TCrud) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        if (img) {
            const data = await Crud.findById(id);
            const imagePath = img?.path;
            const imgName = imagePath.split("/").pop()?.split(".")[0] || "";
            // Update the image on Cloudinary and get the new URL and public ID & save database
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
        // Rollback transaction in case of an error
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, err as any);
    }
}

// Service to delete a CRUD record from the database
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
        // Rollback transaction in case of an error
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