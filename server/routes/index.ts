import { Router } from "express";
import ticketsRoutes from "./ticketsRoutes.ts";

const router = Router();

router.use("/tickets", ticketsRoutes);

export default router;
