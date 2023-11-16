import { IBoard } from "./board";
import { Color, ColorAcronym, ColorFromAcronym, isColorAcronym } from "./color";
import { IStrategy } from "./strategy";
import { createInterface } from "readline";

export interface IPlayer {
    makeMove(board: IBoard): Promise<Color>;
    result(won: boolean, turns: number): void;
}

abstract class APlayer implements IPlayer {
    abstract makeMove(board: IBoard): Promise<Color>;

    result(won: boolean, turns: number): void {
        if (won) {
            console.log("Woohoo!");
            console.log(`You took ${turns} turns.`);
        } else {
            console.log("You lost :(");
            console.log(`You are only allowed to play ${turns - 1} turns.`);
        }
    }
}

export class Player extends APlayer {
    constructor(private readonly strategy: IStrategy) {
        super();
    }

    makeMove(board: IBoard): Promise<Color> {
        const startingCell = board.getStartingCell();
        const color = this.strategy.nextColor(startingCell);
        return new Promise((resolve) => resolve(color));
    }
}

export class TerminalPlayer extends APlayer {
    async makeMove(board: IBoard): Promise<Color> {
        const query = "What color? ( R / G / B / P / O )\n> ";
        let response = await question(query);
        while (!isColorAcronym(response)) {
            if (response === "Ines") {
                console.log("You found the secret!");
                console.log("Hey Ines :)");
            }
            console.log("Invalid color.");
            response = await question(query);
        }
        return ColorFromAcronym[response];
    }
}

async function question(query: string): Promise<string> {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}
