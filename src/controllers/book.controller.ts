import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
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

export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(res, "ID inválido", 400);
    }

    const book = await Book.findById(id);

    if (!book) {
      return sendError(res, "Libro no encontrado", 404);
    }

    return sendSuccess(res, book, "Libro obtenido", 200);
  } catch (error: any) {
    return handleError(res, error);
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(res, "ID inválido", 400);
    }

    const book = await Book.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!book) {
      return sendError(res, "Libro no encontrado", 404);
    }

    return sendSuccess(res, book, "Libro actualizado", 200);
  } catch (error: any) {
    return handleError(res, error);
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(res, "ID inválido", 400);
    }

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return sendError(res, "Libro no encontrado", 404);
    }

    return sendSuccess(res, book, "Libro eliminado", 200);
  } catch (error: any) {
    return handleError(res, error);
  }
};