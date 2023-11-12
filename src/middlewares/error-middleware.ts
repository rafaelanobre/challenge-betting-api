import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const errorStatusMapping = {
    BadRequestError: httpStatus.BAD_REQUEST,
    InvalidDataError: httpStatus.UNPROCESSABLE_ENTITY,
    NotFoundError: httpStatus.NOT_FOUND,
    ConflictError: httpStatus.CONFLICT,
    InternalServerError: httpStatus.INTERNAL_SERVER_ERROR,
};

export default function errorHandler(error, req: Request, res: Response, next: NextFunction) {
    console.log(error);

    const status = errorStatusMapping[error.type] || httpStatus.INTERNAL_SERVER_ERROR;
    return res.status(status).send(error.message || "Sorry, something went wrong");
}