import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export default function errorHandler(error, req: Request, res: Response, next: NextFunction) {
    console.log(error);

    if (error.type === "BadRequestError") {
        return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }

    if (error.type === "InvalidDataError") {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Sorry, something went wrong");
}