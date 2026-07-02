import type { Request, Response, NextFunction } from "express";
import { ValidationError } from "yup";
import { ticketSchema, statusSchema } from "../schemas.ts";

export const validateTicket = async (
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

export const validateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await statusSchema.validate(req.body);
    next();
  } catch (error) {
    const { errors } = error as ValidationError;
    res.status(400).json({ errors });
  }
};
