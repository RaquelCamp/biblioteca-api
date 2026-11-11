import { Schema, model } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema <IBook>(
    {
        title: { type: String, required: [true, "El titulo es obligatorio"], unique: true, trim: true },
        author: { type: String, required: [true, "El auto es obligatorio"], trim: true }, 
        publichedYear: { type: Number },
        genre: {type: String },
        available: { type: Boolean, default: true },
    },
    { timestamps: true, versionKey: false }
);

export const Book = model <IBook>("Book", bookSchema);