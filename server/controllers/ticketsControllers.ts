import type { Request, Response, NextFunction } from "express";
import ticketsServices from "../services/ticketsService.ts";
import type { ITicket } from "../models.ts";

const ticketsControllers = {
  readAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await ticketsServices.readAll();
      res.json(response);
    } catch (error) {
      next(error);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { body }: { body: ITicket } = req;
    try {
      const response = await ticketsServices.create(body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  },
};

export default ticketsControllers;
