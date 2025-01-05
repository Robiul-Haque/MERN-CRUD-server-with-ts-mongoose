import { model, Schema } from "mongoose";
import { IUserModel, TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";

const userSchema = new Schema<TUser, IUserModel>({
    image: {
        url: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        }
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
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        default: null,
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.salt_rounds)
    );
    next();
});

userSchema.statics.isPasswordMatch = async function (email: string, password: string) {
    const hashedPassIntoDB = await this.findOne({ email }).select('+password');
    return await bcrypt.compare(String(password), String(hashedPassIntoDB?.password));
}

userSchema.statics.isUserExist = async function (email: string) {
    return await this.findOne({ email });
}

userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate() as any;
    if (update && update.password) {
        update.password = await bcrypt.hash(
            update.password,
            Number(config.salt_rounds),
        );
        this.setUpdate(update);
    }
    next();
});

userSchema.statics.isTokenValid = function (token: string) {
    const { email } = jwt.verify(token, config.jwt_access_key as string) as JwtPayload;
    return email;
};

export const User = model<TUser, IUserModel>('User', userSchema);