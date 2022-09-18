import { PlayerSign } from "src/domain/enums/PlayerSign";

export class MakeMoveRequestDto {
    fieldId: number;
    playerSign: PlayerSign;
}
