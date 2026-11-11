import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { sendSuccess, sendError } from "../utils/response";

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    sendSuccess(res, book, "Libro creado", 201);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      sendError(res, "Faltan datos obligatorios", 400);
    } else if (error.code === 11000) {
      sendError(res, "Ya existe un libro con ese título", 409);
    } else {
      sendError(res, "Error interno del servidor", 500);
    }
  }
};