import httpStatus from "http-status";
import { TCrud } from "./crud.interface";
import { Crud } from "./crud.model";
import fs from 'fs';
import path from 'path';
import AppError from "../../errors/appError";
import mongoose from "mongoose";
import { uploadImageToCloudinary } from "../../utils/handleImageToCloudinary";

const createCrudIntoDB = async (img: any, payload: TCrud) => {
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

const updateCrudIntoDB = async (id: string, payload: TCrud) => {
    const data = await Crud.findById(id);
    if (data?.image) {
        fs.unlink(`public/uploads/${data?.image}`, err => {
            if (err) {
                throw new AppError(httpStatus.NOT_FOUND, `Error updating file: ${err}`);
            }
        })
    }

    const res = await Crud.findByIdAndUpdate(id, payload);
    return res;
}

const deleteCrudIntoDB = async (id: string) => {
    const data = await Crud.findById(id);
    // if (data?.image) {
    //     const filePath = path.join(process.cwd(), 'public/uploads', data?.image);
    //     fs.unlink(filePath, err => {
    //         if (err) {
    //             throw new AppError(httpStatus.NOT_FOUND, `Error deleting file: ${err}`);
    //         }
    //     });
    // }

    const res = await Crud.findByIdAndDelete(id);
    return res;
}

export const crudService = {
    createCrudIntoDB,
    getAllCrudsFromDB,
    getSingleCrudFromDB,
    updateCrudIntoDB,
    deleteCrudIntoDB,
}