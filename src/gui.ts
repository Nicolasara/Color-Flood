import { RectangularBoard, IBoard } from "./board";
import { ICell } from "./cell";
import { Color, ColorAcronym } from "./color";

export interface IGui {
    displayBoard(): void;
}

export class TerminalGui implements IGui {
    constructor(private readonly board: IBoard) {}

    displayBoard(): void {
        let cell: ICell | null = this.board.getStartingCell();
        while (cell) {
            this.displayRow(cell);
            cell = cell.getBottomCell();
        }
    }

    private displayRow(cellInRow: ICell) {
        let leftMostCell: ICell = cellInRow;
        while (leftMostCell.getLeftCell()) {
            leftMostCell = leftMostCell.getLeftCell() as ICell;
        }

        let width = 0;
        let stringRow = "";
        for (
            let cell = leftMostCell;
            cell;
            cell = cell.getRightCell() as ICell
        ) {
            stringRow += " | ";
            stringRow += ColorAcronym[cell.getColor()];
            width++;
        }
        stringRow += " |";
        const topBuffer = " " + "----".repeat(width) + "-";
        console.log(topBuffer);
        console.log(stringRow);
        if (cellInRow.getBottomCell() === null) {
            console.log(topBuffer);
        }
    }
}
