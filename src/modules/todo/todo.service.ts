import { TUser } from "./todo.interface";
import { User } from "./todo.model";

const createUserIntoIntoDB = async (payload: TUser) => {
   const result = await User.create(payload);
   return result;
}

export const userService = {
    createUserIntoIntoDB,
}