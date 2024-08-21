import { TCrud } from "./crud.interface";
import { Crud } from "./crud.model";

const createCrudIntoIntoDB = async (payload: TCrud) => {
    const result = await Crud.create(payload);
    return result;
}

export const userService = {
    createCrudIntoIntoDB,
}