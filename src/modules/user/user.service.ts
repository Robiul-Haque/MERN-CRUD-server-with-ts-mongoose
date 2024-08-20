import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserInfoIntoDB = (payload: TUser) => {
   const result = User.create(payload);
   return result;
}

export const userService = {
    createUserInfoIntoDB,
}