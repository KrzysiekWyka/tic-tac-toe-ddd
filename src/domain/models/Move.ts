import { BadRequestException } from "@nestjs/common";
import { PlayerSign } from "src/infrastructure/entities/GameEntity";
import { Field } from "./Field";

export class Move {
    private readonly _gameId: string;
    private readonly _field: Field;

    constructor(gameId: string, field: Field) {
        this._field = field;
        this._gameId = gameId;
    }

    get gameId(): string {
        return this._gameId;
    }

    get field(): Field {
        return this._field;
    }

    assureIfValid(
        fields: Field[],
        nextTurnPlayerSign: PlayerSign
    ): void {
        const isCorrectPlayer = this._field.playerSign === nextTurnPlayerSign;
        const isFieldValid = this._field.isValid();
        const isFieldAlreadySigned = fields.some(existingField => existingField.fieldId === this._field.fieldId);

        if (!isCorrectPlayer || isFieldAlreadySigned || !isFieldValid) {
            throw new BadRequestException("Move is invalid.");
        }
    }
}