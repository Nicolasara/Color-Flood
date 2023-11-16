import { ICell } from "./cell";
import { Color, getRandomColor } from "./color";

export interface IStrategy {
    nextColor(startingCell: ICell): Color;
}

export class RandomStrategy implements IStrategy {
    nextColor(startingCell: ICell): Color {
        return getRandomColor();
    }
}

export class RedStrategy implements IStrategy {
    nextColor(startingCell: ICell): Color {
        return Color.RED;
    }
}

export class GreenStrategy implements IStrategy {
    nextColor(startingCell: ICell): Color {
        return Color.GREEN;
    }
}

export class InesStrategy implements IStrategy {
    private turn: number;

    constructor() {
        this.turn = 1;
    }
    nextColor(startingCell: ICell): Color {
        this.turn += 1;
        const cellAtTurnColumn = this.cellAtColumn(startingCell, this.turn);
        return cellAtTurnColumn.getColor();
    }

    /**
     * get a cell in the target column
     *
     * @param leftMostCell the left most cell of the board
     * @param targetColumn the column to go to
     * @returns a cell in the target column
     */
    private cellAtColumn(leftMostCell: ICell, targetColumn: number): ICell {
        let currentCell = leftMostCell;
        for (let index = 1; index < targetColumn; index++) {
            const rightCell = currentCell.getRightCell();
            if (rightCell === null) {
                currentCell = leftMostCell;
            } else {
                currentCell = rightCell;
            }
        }
        return currentCell;
    }
}
