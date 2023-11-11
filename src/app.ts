import express, { json, Request, Response } from "express";
import "express-async-errors";
import participantsRouter from "./routers/participants-router";
import errorHandler from "./middlewares/error-middleware";

const app = express();

app
    .use(json())
    .use('/participants', participantsRouter)
    .use(errorHandler)

app.get("/health", (req: Request, res: Response) => {
    res.status(200).send("OK!");
});

export default app;