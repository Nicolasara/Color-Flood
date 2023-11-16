import { RectangularBoard, IBoard, IMutableBoard } from "./board";
import { IGui, TerminalGui } from "./gui";
import { IPlayer, Player, TerminalPlayer } from "./player";
import { RandomStrategy } from "./strategy";

export async function playGame(
    board: IMutableBoard,
    player: IPlayer,
    gui: IGui | undefined
) {
    while (!board.isGameOver()) {
        gui?.displayBoard();
        const chosenColor = await player.makeMove(board);
        board.changeColor(chosenColor);
    }
    gui?.displayBoard();
    player.result(board.won(), board.getTurnCount());
}
