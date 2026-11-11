import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { sendSuccess, sendError } from "../utils/response";

const handleError = (res: Response, error: any) => {
  if (error.name === "ValidationError") {
    return sendError(res, "Error de validación", 400);
  }

  if (error.code === 11000) {
    return sendError(res, "Ya existe un libro con ese título", 409);
  }

  console.error(error);
  return sendError(res, "Error interno del servidor", 500);
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    return sendSuccess(res, book, "Libro creado", 201);
  } catch (error: any) {
    return handleError(res, error);
  }
};


export const getBooks = async (_req: Request, res: Response) => {
  try {
    const books = await Book.find();
    return sendSuccess(res, books, "Libros obtenidos", 200);
  } catch (error: any) {
    return handleError(res, error);
  }
};