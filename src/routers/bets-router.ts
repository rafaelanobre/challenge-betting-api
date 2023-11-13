import { Router } from "express";
import { validateSchema } from "../middlewares/schema-middleware";
import { betSchema } from "../schemas/bets-schema";
import * as betsContoller from "../controllers/bets-controller";

const betsRouter = Router();

betsRouter
    .post('/', validateSchema(betSchema), betsContoller.create)

export default betsRouter;