import { Router } from "express";
import { validateSchema } from "../middlewares/schema-middleware";
import { finishGameSchema, newGameSchema } from "../schemas/games-schema";
import * as gamesContoller from "../controllers/games-controller";

const gamesRouter = Router();

gamesRouter
    .get('/', gamesContoller.getAll)
    .get('/:id', gamesContoller.getById)
    .post('/', validateSchema(newGameSchema), gamesContoller.create)
    .post('/:id/finish', validateSchema(finishGameSchema), gamesContoller.update)

export default gamesRouter;