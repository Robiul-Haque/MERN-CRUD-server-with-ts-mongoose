import httpStatus from "http-status";
import { TCrud } from "./crud.interface";
import { Crud } from "./crud.model";
import fs from 'fs';
import path from 'path';
import AppError from "../../errors/appError";

const createCrudIntoDB = async (payload: TCrud) => {
    const res = await Crud.create(payload);
    return res;
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
    if (data?.image) {
        const filePath = path.join(process.cwd(), 'public/uploads', data?.image);
        fs.unlink(filePath, err => {
            if (err) {
                throw new AppError(httpStatus.NOT_FOUND, `Error deleting file: ${err}`);
            }
        });
    }

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