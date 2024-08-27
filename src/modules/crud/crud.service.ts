import { TCrud } from "./crud.interface";
import { Crud } from "./crud.model";
import fs from 'fs';
import path from 'path';

const createCrudIntoDB = async (payload: TCrud) => {
    const result = await Crud.create(payload);
    return result;
}

const updateCrudIntoDB = async (id: string, payload: TCrud) => {
    const data = await Crud.findById(id);
    if (data?.image) {
        fs.unlink(`public/uploads/${data?.image}`, err => {
            if (err) {
                console.log('Error updating file:', err);
            }
        })
    }

    const result = await Crud.findByIdAndUpdate(id, payload);
    return result;
}

const deleteCrudIntoDB = async (id: string) => {
    const data = await Crud.findById(id);
    if (data?.image) {
        const filePath = path.join(process.cwd(), 'public/uploads', data?.image);
        fs.unlink(filePath, err => {
            if (err) {
                console.log('Error deleting file', err);
            }
        });
    }

    const result = await Crud.findByIdAndDelete(id);
    return result;
}

export const crudService = {
    createCrudIntoDB,
    updateCrudIntoDB,
    deleteCrudIntoDB,
}