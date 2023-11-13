import { Bet, Game } from "../protocols/index";

export function wonBet(game: Game, bet: Bet){
    return bet.homeTeamScore == game.homeTeamScore && bet.awayTeamScore == game.awayTeamScore;
}