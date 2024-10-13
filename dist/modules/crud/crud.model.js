"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crud = void 0;
const mongoose_1 = require("mongoose");
const crudSchema = new mongoose_1.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        maxlength: 255,
        minlength: 1,
    },
    priority: {
        type: String,
        required: true
    }
}, { timestamps: true });
exports.Crud = (0, mongoose_1.model)('Crud', crudSchema);
