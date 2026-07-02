import type { Request, Response, NextFunction } from "express";
import { ValidationError } from "yup";
import { ticketSchema } from "../schemas.ts";

export const validateBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ticketSchema.validate(req.body);
    next();
  } catch (error) {
    const { errors } = error as ValidationError;
    res.status(400).json({ errors });
  }
};
