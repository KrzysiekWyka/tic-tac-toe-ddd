import { Module } from "@nestjs/common";
import { GameService } from "src/domain/services/GameService";
import { GameRepository } from "src/infrastructure/repositories/GameRepository";
import { GameController } from "./controllers/game.controller";

@Module({
    controllers: [GameController],
    providers: [GameService, GameRepository]
})
export class GameModule {}