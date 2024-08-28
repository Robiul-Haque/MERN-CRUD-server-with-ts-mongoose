import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const signInIntoDB = async (payload: TLoginUser) => {
    const isUserExist = await User.findOne({
        $or: [{ name: payload?.name }, { email: payload?.email }]
    }).select('-_id -image -phone -password -createdAt -updatedAt -__v')
    return isUserExist;
}

export const authService = {
    signInIntoDB,
}