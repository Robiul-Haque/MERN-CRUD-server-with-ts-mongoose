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
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    required: true
  }
}, { timestamps: true });


export const Crud = model<TCrud>('Crud', crudSchema);