import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Field } from "src/domain/models/Field";
import { Game } from "src/domain/models/Game";
import { Move } from "src/domain/models/Move";
import { GameService } from "src/domain/services/GameService";
import { MakeMoveRequestDto } from "../dto/MakeMoveRequestDto";

@Controller('api/games')
export class GameController {
    constructor(
        private readonly gameService: GameService,
    ) {}

    @Get(':id')
    async getGameInfo(@Param('id') id: string): Promise<Game> {
        return await this.gameService.getGameInfo(id);
    }

    @Post()
    async createGame(): Promise<Game> {
        return await this.gameService.createGame();
    }

    @Put(':id/board')
    async makeMove(@Param('id') id: string, @Body() data: MakeMoveRequestDto): Promise<Game> {
        const field = new Field(
            data.fieldId,
            data.playerSign
        );

        return await this.gameService.makeMove(
            new Move(id, field)
        );
    }
}