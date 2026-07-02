import { Router } from "express";
import ticketsControllers from "../controllers/ticketsControllers.ts";
import { validateTicket,validateStatus } from "../middleware/validateBody.ts";

const router = Router();

router.get("/", ticketsControllers.readAll);
router.post("/", validateTicket, ticketsControllers.create);
router.patch("/:id", validateStatus, ticketsControllers.patch);

export default router;
