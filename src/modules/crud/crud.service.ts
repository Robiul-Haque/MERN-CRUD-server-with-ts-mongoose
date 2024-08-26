import { TCrud } from "./crud.interface";
import { Crud } from "./crud.model";
import fs from 'fs';

const createCrudIntoIntoDB = async (payload: TCrud) => {
    const result = await Crud.create(payload);
    return result;
}

const updateCrudIntoIntoDB = async (id: string, payload: TCrud) => {
    const data = await Crud.findById(id);
    console.log(data?.image);
    if (data?.image) {
        fs.unlink(`public/uploads/${data?.image}`, err => {
            if (err) {
                console.log('Error deleting file:', err);
            }
        })
    }

    const result = await Crud.findByIdAndUpdate(id, payload);
    return result;
}

export const crudService = {
    createCrudIntoIntoDB,
    updateCrudIntoIntoDB,
}