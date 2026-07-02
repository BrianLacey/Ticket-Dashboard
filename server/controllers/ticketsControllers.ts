import type { Request, Response, NextFunction } from "express";
import ticketsServices from "../services/ticketsService.ts";
import type { ITicket, eStatus } from "../models.ts";

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
  patch: async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { id }: { id: string } = req.params;
    const { status }: { status: typeof eStatus } = req.body;
    const nextUpdate = { id, status };
    try {
      const response = await ticketsServices.patch(nextUpdate);
      res.json(response);
    } catch (error) {
      next(error);
    }
  },
};

export default ticketsControllers;
