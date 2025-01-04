import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    isUsed: { type: Boolean, default: false },
});

export const OTP = mongoose.model("OTP", otpSchema);