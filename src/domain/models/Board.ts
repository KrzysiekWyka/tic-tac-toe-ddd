import { BOARD_SIZE } from "../constants";
import { PlayerSign } from "../enums/PlayerSign";
import { Field } from "./Field";
import { Move } from "./Move";

const WINNING_FIELDS_COMBINATIONS = [
    // -
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // |
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // /
    [0, 4, 8],
    [2, 4, 6],
];

export class Board {
    private readonly _fields: Field[];
    private readonly _nextTurnPlayerSign: PlayerSign;

    constructor(
        fields: Field[],
        nextTurnPlayerSign: PlayerSign,
    ) {
        this._fields = fields;
        this._nextTurnPlayerSign = nextTurnPlayerSign;
    }

    get fields(): Field[] {
        return this._fields;
    }

    get nextPlayerSign(): PlayerSign {
        return this._nextTurnPlayerSign;
    }

    makeMove(move: Move): void {
        move.assureIfValid(this._fields, this._nextTurnPlayerSign);

        this._fields.push(move.field);
    }

    findWinner(): PlayerSign | undefined {
        for (const playerSign of Object.values(PlayerSign)) {
            const winningCombinationFound = WINNING_FIELDS_COMBINATIONS.some(combination =>
                combination.every(fieldId => {
                    const field = this.fields.find(field => field.fieldId === fieldId);

                    return field?.playerSign === playerSign;
                })
            );

            if (winningCombinationFound) {
                return playerSign;
            }
        }
    }

    hasEmptyFields(): boolean {
        return this._fields.length < BOARD_SIZE;
    }

    clone() {
        return new Board(
            this._fields,
            this._nextTurnPlayerSign
        );
    }

    toJSON() {
        return { fields: this._fields, nextTurnPlayerSign: this._nextTurnPlayerSign };
    }
}
