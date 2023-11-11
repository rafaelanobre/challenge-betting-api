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