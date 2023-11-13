export type Participant = {
    id: number;
    name:  string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
}

export type ParticipantCreate = Omit<Participant, "id" | "createdAt" | "updatedAt">


export type Bet = {
    id: number;
    gameId: number;
    participantId: number;
    homeTeamScore: number;
    awayTeamScore: number;
    amountBet: number;
    status: 'PENDING' | 'WON' | 'LOST';
    amountWon: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export type BetCreate = Omit<Bet, "id" | "status" | "amountWon" | "createdAt" | "updatedAt">
export type BetResult = Omit<Bet, "id" | "gameId" | "participantId" | "homeTeamScore" | "awayTeamScore" | "amountBet" | "createdAt" | "updatedAt" >

export type GameWithBets = {
    id: number;
    homeTeamName:  string;
    awayTeamName:  string;
    homeTeamScore: number;
    awayTeamScore: number;
    isFinished: boolean;
    bets: Bet[];
    createdAt: Date;
    updatedAt: Date;
}
export type Game = Omit<GameWithBets, "bets">
export type GameCreate = Omit<GameWithBets, "id" | "homeTeamScore" | "awayTeamScore" | "isFinished" | "bets" | "createdAt" | "updatedAt">
export type GameUpdate = Omit<GameWithBets, "id" | "homeTeamName" | "awayTeamName" | "isFinished" | "bets" | "createdAt" | "updatedAt">