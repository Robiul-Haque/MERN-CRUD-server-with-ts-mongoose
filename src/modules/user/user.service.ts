import { TUser } from "./user.interface";
import { User } from "./user.model";
import fs from "fs";

const signUpIntoDB = async (payload: TUser) => {
    const res = await User.create(payload);
    return res;
}

const getSingleUserIntoDB = async (email: string) => {
    const res = await User.findOne({ email });
    return res;
}

const getSingleUserForUpdateIntoDB = async (email: string) => {
    const res = await User.findOne({ email });
    return res;
}

const updateSingerUserIntoDB = async (email: string, payload: TUser) => {
    const data = await User.findOne({ email });
    if (data?.image) {
        fs.unlink(`public/uploads/${data?.image}`, err => {
            if (err) {
                console.log('Error updating file:', err);
            }
        })
    }

    const isUpdate = await User.findOneAndUpdate({ email }, payload);
    if (isUpdate) {
        const res = await User.findOne({ email });
        return res;
    }
}

export const userService = {
    signUpIntoDB,
    getSingleUserIntoDB,
    getSingleUserForUpdateIntoDB,
    updateSingerUserIntoDB,
}