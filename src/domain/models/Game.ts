import { GameStatus } from "../enums/GameStatus";
import { GameStatus as EntityGameStatus } from "../../infrastructure/entities/GameEntity"
import { PlayerSign } from "../enums/PlayerSign";
import { Board } from "./Board";
import { Field } from "./Field";
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";

const throwUnexpectedGameStatusException = (_: never) => {
    throw new InternalServerErrorException("Unexpected game status.");
};

export class Game {
    private readonly _board: Board;
    private readonly _id: string;
    private readonly _entityGameStatus: EntityGameStatus;

    constructor(
        id: string,
        nextTurnPlayerSign: PlayerSign,
        fields: Field[],
        entityGameStatus: EntityGameStatus,
    ) {
        this._board = new Board(
            fields,
            nextTurnPlayerSign
        );
        this._id = id;
        this._entityGameStatus = entityGameStatus;
    }

    get board(): Board {
        return this._board;
    }

    get id(): string {
        return this._id;
    }

    assureIfPending(): void {
        const isFinished = this.calculateGameStatus() !== GameStatus.InProgress;

        if (isFinished) {
            throw new BadRequestException("Game is finished.");
        }
    }

    toJSON() {
        return {
            id: this._id,
            board: this._board,
            status: this.calculateGameStatus()
        };
    }

    private calculateGameStatus(): GameStatus {
        switch(this._entityGameStatus) {
            case EntityGameStatus.Draw:
                return GameStatus.Draw;
            case EntityGameStatus.InProgress:
                return GameStatus.InProgress;
            case EntityGameStatus.Finished:
                return this.calculateWinStatus();
            default:
                // ts hack to throw error in the future if someone will decide to extend EntityGameStatus enum
                // and forgot to edit this code
                throwUnexpectedGameStatusException(this._entityGameStatus);
        }
    }

    private calculateWinStatus(): GameStatus.PlayerOWon | GameStatus.PlayerXWon {
        const winner = this._board.findWinner();

        if (winner === PlayerSign.O) {
            return GameStatus.PlayerOWon;
        } else if (winner === PlayerSign.X) {
            return GameStatus.PlayerXWon;
        }

        // exception could be thrown when EntityGameStatus === Finished and winner could not be found
        throw new InternalServerErrorException('Game status conflict.');
    }
}
