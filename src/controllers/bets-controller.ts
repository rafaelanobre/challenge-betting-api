import { Request, Response } from "express";
import httpStatus from "http-status";
import { BetCreate } from "../protocols/index";
import * as betsService from '../services/bets-service';

export async function create(req: Request,res: Response){
    const betData = req.body as BetCreate;

    const bet = await betsService.create(betData);
    res.status(httpStatus.CREATED).send(bet);
}