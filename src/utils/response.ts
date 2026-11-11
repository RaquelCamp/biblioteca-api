import { Response } from "express";

export const sendSuccess = (res: Response, data: any, message: string, status: number) => {
  res.status(status).json({
    success: true,
    message: message,
    data: data,
  });
};

export const sendError = (res: Response, message: string, status: number) => {
  res.status(status).json({
    success: false,
    message: message,
  });
};