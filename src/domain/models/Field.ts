import { BOARD_SIZE } from "../constants";
import { PlayerSign } from "../enums/PlayerSign";

const VALID_FIELD_IDS = Array(BOARD_SIZE).fill(undefined).map((_, i) => i);
const VALID_PLAYER_SIGNS = Object.values(PlayerSign);

export class Field {
    private readonly _fieldId: number;
    private readonly _playerSign: PlayerSign;

    constructor(
        fieldId: number,
        playerSign: PlayerSign
    ) {
        this._fieldId = fieldId;
        this._playerSign = playerSign;
    }

    get fieldId(): number {
        return this._fieldId;
    }

    get playerSign(): PlayerSign {
        return this._playerSign;
    }

    isValid(): boolean {
        const hasValidFieldId = VALID_FIELD_IDS.includes(this._fieldId);
        const hasValidPlayerSign = VALID_PLAYER_SIGNS.includes(this._playerSign);

        return hasValidFieldId && hasValidPlayerSign;
    }

    toJSON() {
        return {
            fieldId: this._fieldId,
            playerSign: this._playerSign
        };
    }
}