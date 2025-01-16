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

// Middleware to hash the user's password before saving it to the database.
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
    next();
});

// Static method to compare a provided password with the hashed password in the database.
userSchema.statics.isPasswordMatch = async function (email: string, password: string) {
    const hashedPassIntoDB = await this.findOne({ email }).select('+password');
    return bcrypt.compare(String(password), String(hashedPassIntoDB?.password));
}

// Static method to check if a user exists by email.
userSchema.statics.isUserExist = async function (email: string) {
    return await this.findOne({ email });
}

// Static method to verify if a JWT token is valid.
userSchema.statics.isTokenValid = function (token: string) {
    const { email } = jwt.verify(token, config.jwt_access_key as string) as JwtPayload;
    return email;
};

// Create and export the User model using the schema and TypeScript interfaces.
export const User = model<TUser, IUserModel>('User', userSchema);