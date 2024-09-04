import { model, Schema } from "mongoose";
import { IUserModel, TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, IUserModel>({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.SALT_ROUNDS),
    );
    next();
});

userSchema.statics.isPasswordMatch = async function (email: string, password: string) {
    const hashedPassIntoDB = await this.findOne({ email }).select('+password');
    return await bcrypt.compare(String(password), String(hashedPassIntoDB?.password));
}

export const User = model<TUser, IUserModel>('User', userSchema);