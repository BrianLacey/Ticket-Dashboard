import type { Request, Response, NextFunction } from "express";
import type { IError } from "../models.ts";

const errorHandler = (
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(error.status || 500)
    .json({ message: error.message || "An error occurred." });
};
export default errorHandler;
