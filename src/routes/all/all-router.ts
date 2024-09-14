import { Router } from "express";
import AllController from "./all-controller";
import { authMiddleware } from "../../middlewares/auth-middleware";

const allRouter = Router();
const allController = new AllController();

allRouter.get("/pets", authMiddleware, allController.getPets);
allRouter.post("/add-pet", authMiddleware, allController.addPet);
allRouter.get("/events", authMiddleware, allController.getEvents);
allRouter.post("/add-event", authMiddleware, allController.addEvent);
allRouter.post("/add-psychologist", authMiddleware, allController.addPsychologist);
allRouter.get("/psychologists", authMiddleware, allController.getPsychologists);
allRouter.post("/rate-psychologist", authMiddleware, allController.ratePsychologist);

export default allRouter;