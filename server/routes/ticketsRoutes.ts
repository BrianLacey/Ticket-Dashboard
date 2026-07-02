import { Router } from "express";
import ticketsControllers from "../controllers/ticketsControllers.ts";
import { validateBody } from "../middleware/validateBody.ts";

const router = Router();

router.get("/", ticketsControllers.readAll);
router.post("/", validateBody, ticketsControllers.create);

export default router;
