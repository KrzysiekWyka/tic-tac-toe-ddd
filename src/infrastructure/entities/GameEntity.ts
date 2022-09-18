import { randomBytes } from 'crypto';

export type PlayerSign = 'x' | 'o';
type Field = { fieldId: number, playerSign: PlayerSign };

export enum GameStatus {
    InProgress = 'in_progress',
    Draw = 'draw',
    Finished = 'finished'
}

export class GameEntity {
    id: string;
    fields: Field[];
    status: GameStatus;

    constructor(
        public nextPlayerSign: PlayerSign
    ) {
        this.id = randomBytes(16).toString('hex');
        this.fields = [];
        this.status = GameStatus.InProgress;
    }
}
