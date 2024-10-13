"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.Schema({
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
        type: String,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.salt_rounds));
        next();
    });
});
userSchema.statics.isPasswordMatch = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassIntoDB = yield this.findOne({ email }).select('+password');
        return yield bcrypt_1.default.compare(String(password), String(hashedPassIntoDB === null || hashedPassIntoDB === void 0 ? void 0 : hashedPassIntoDB.password));
    });
};
userSchema.statics.isUserExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findOne({ email });
    });
};
userSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        if (update && update.password) {
            update.password = yield bcrypt_1.default.hash(update.password, Number(config_1.default.salt_rounds));
            this.setUpdate(update);
        }
        next();
    });
});
userSchema.statics.isTokenValid = function (token) {
    const { email } = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_key);
    return email;
};
exports.User = (0, mongoose_1.model)('User', userSchema);
