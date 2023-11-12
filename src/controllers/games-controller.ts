import { Request, Response } from "express";
import httpStatus from "http-status";
import * as gamesService from "../services/games-service";
import { GameCreate, GameUpdate } from "../protocols/index";
import { isValidId } from "../utils/id-validator";

export async function getAll(req: Request,res: Response) {
    const games = await gamesService.getAll();
    res.status(httpStatus.OK).send(games);
}

export async function getById(req: Request,res: Response) {
    const id = Number(req.params.id);
    if(!isValidId(id)) return res.sendStatus(httpStatus.NOT_FOUND);

    const game = await gamesService.getById(id);
    res.status(httpStatus.OK).send(game);
}

export async function create(req: Request,res: Response) {
    const gameData = req.body as GameCreate;

    const game = await gamesService.create(gameData);
    res.status(httpStatus.CREATED).send(game);
}

export async function update(req: Request,res: Response) {
    const id = Number(req.params.id);
    if(!isValidId(id)) return res.sendStatus(httpStatus.NOT_FOUND);
    
    const score = req.body as GameUpdate;
    
    const game = await gamesService.update(id, score);
    res.status(httpStatus.OK).send(game);
}