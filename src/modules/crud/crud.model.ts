import { model, Schema } from "mongoose";
import { TCrud } from "./crud.interface";

const crudSchema = new Schema<TCrud>({
  image: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (v: string) => /(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?/.test(v),
      message: "Invalid image URL"
    }
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    validate: {
      validator: (v: number) => /^\d{10}$/.test(String(v)),
      message: "Invalid phone number"
    }
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
});


export const Crud = model<TCrud>('Crud', crudSchema);