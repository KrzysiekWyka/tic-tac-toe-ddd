import { GameEntity, PlayerSign } from "../entities/GameEntity";
import { readFile, writeFile } from 'fs/promises';
import { Injectable } from "@nestjs/common";
import { join as pathJoin } from 'path';

const FILE_PATH = pathJoin(__dirname, '../../../repo.txt');

@Injectable()
export class GameRepository {
    async findGameById(id: string): Promise<GameEntity | undefined> {
        const allGames = await this.readRepoFile();

        return allGames.find(game => game.id === id);
    }

    async create(startingPlayer: PlayerSign): Promise<GameEntity> {
        const game = new GameEntity(startingPlayer);

        const allGames = await this.readRepoFile();

        await this.writeRepoFile([...allGames, game]);

        return game;
    }

    async updateById(id, model: Partial<GameEntity>): Promise<string> {
        const allGames = await this.readRepoFile();

        const indexToReplace = allGames.findIndex(game => game.id === id);

        allGames[indexToReplace] = { ...allGames[indexToReplace], ...model};

        await this.writeRepoFile(allGames);

        return model.id ?? id;
    }

    private async readRepoFile(): Promise<GameEntity[]> {
        const content = (await readFile(FILE_PATH)).toString('utf-8');

        return JSON.parse(content);
    }

    private async writeRepoFile(data: GameEntity[]): Promise<void> {
        const jsonData = JSON.stringify(data);

        await writeFile(FILE_PATH, jsonData, 'utf8');
    }
}