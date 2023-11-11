import { Router } from "express";
import * as participantsController from '../controllers/participants-controller';
import { validateSchema } from "../middlewares/schema-middleware";
import participantSchema from "../schemas/participants-schema";

const participantsRouter = Router();

participantsRouter
    .get('/', participantsController.getAll)
    .post('/', validateSchema(participantSchema),  participantsController.create)

export default participantsRouter;