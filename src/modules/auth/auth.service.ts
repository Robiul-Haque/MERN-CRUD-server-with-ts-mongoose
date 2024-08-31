import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";

const signInIntoDB = async (payload: TLoginUser) => {
    const hashedPassIntoDB = await User.findOne({ $or: [{ name: payload.name }, { email: payload.email }] }).select("-_id -image -name -email -phone -createdAt -updatedAt -__v")

    const isPasswordMatch = await bcrypt.compare(String(payload?.password), String(hashedPassIntoDB?.password));

    const isUserExist = await User.findOne({
        $or: [{ name: payload?.name }, { email: payload?.email }]
    }).select('-_id -image -phone -password -createdAt -updatedAt -__v')

    if (isPasswordMatch && isUserExist !== null) {
        return isUserExist;
    } else {
        console.log('user is not found');
    }
}

export const authService = {
    signInIntoDB
}