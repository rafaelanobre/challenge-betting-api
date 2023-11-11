import { Request, Response } from "express";
import * as participantsService from '../services/participants-service';
import httpStatus from "http-status";
import { Participant, ParticipantCreate } from "../protocols/index";

export async function getAll(req: Request,res: Response) {
    const participants = await participantsService.getAll();
    res.status(httpStatus.OK).send(participants);
}

export async function create(req: Request,res: Response) {
    const participant = req.body as ParticipantCreate;

    const creation: Participant = await participantsService.create(participant);

    res.status(httpStatus.CREATED).send(creation);
}