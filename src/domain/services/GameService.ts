import { Injectable, NotFoundException } from "@nestjs/common";
import { GameRepository } from "src/infrastructure/repositories/GameRepository";
import { PlayerSign } from "../enums/PlayerSign";
import { Field } from "../models/Field";
import { Game } from "../models/Game";
import { Move } from "../models/Move";
import { GameEntity, GameStatus } from "src/infrastructure/entities/GameEntity";

const STARTING_PLAYER = PlayerSign.X;

@Injectable()
export class GameService {
    constructor(private readonly gameRepository: GameRepository) {}

    async getGameInfo(gameId: string): Promise<Game> {
        const gameEntity = await this.gameRepository.findGameById(gameId);

        if (!gameEntity) {
            throw new NotFoundException('Game not found.');
        }

        return new Game(
            gameEntity.id,
            gameEntity.nextPlayerSign as PlayerSign,
            gameEntity.fields.map(
                field => new Field(
                    field.fieldId,
                    field.playerSign as PlayerSign
                ),
            ),
            gameEntity.status,
        );
    }

    async createGame(): Promise<Game> {
        const { id } = await this.gameRepository.create(STARTING_PLAYER);

        return await this.getGameInfo(id)
    }

    async makeMove(move: Move): Promise<Game> {
        const game = await this.getGameInfo(move.gameId);

        game.assureIfPending();

        const newBoard = game.board.clone();

        newBoard.makeMove(move);

        const nextPlayerSign = game.board.nextPlayerSign === PlayerSign.X? PlayerSign.O: PlayerSign.X;

        const entityModelToUpdate: Partial<GameEntity> = {
            nextPlayerSign,
            fields: newBoard.fields.map(field => ({
                fieldId: field.fieldId,
                playerSign: field.playerSign
            }))
        };

      const winner = newBoard.findWinner();

        if (winner) {
            entityModelToUpdate.status = GameStatus.Finished;
        } else if (!winner && !newBoard.hasEmptyFields()) {
            entityModelToUpdate.status = GameStatus.Draw;
        }

        await this.gameRepository.updateById(game.id, entityModelToUpdate);

        return await this.getGameInfo(move.gameId);
    }
}
