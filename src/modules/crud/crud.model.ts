import { model, Schema } from "mongoose";
import { TCrud } from "./crud.interface";

const crudSchema = new Schema<TCrud>({
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


export const Crud = model<TCrud>('Crud', crudSchema);