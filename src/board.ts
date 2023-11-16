import { Cell, IMutableCell, ICell } from "./cell";
import { Color, getRandomColor } from "./color";
import {
    MAX_TURN_COUNT,
    MINIMUM_HEIGHT,
    MINIMUM_WIDTH,
} from "./types/constants.types";

export interface IBoard {
    getStartingCell(): ICell;
    getTurnCount(): number;
    won(): boolean;
    isGameOver(): boolean;
}

export interface IMutableBoard extends IBoard {
    changeColor(color: Color): void;
}

abstract class ABoard implements IBoard {
    private readonly startingCell: IMutableCell;
    private currentColor: Color;
    private turnCount: number;

    constructor(startingCell: IMutableCell) {
        this.startingCell = startingCell;
        this.currentColor = startingCell.getColor();
        this.turnCount = 0;
    }

    getStartingCell(): ICell {
        return this.startingCell;
    }

    getTurnCount(): number {
        return this.turnCount;
    }

    won(): boolean {
        const cellCount = this.getAllCells().size;
        const capturedCellsCount = this.getCapturedCells().size;
        console.log(cellCount);
        console.log(capturedCellsCount);
        const boardIsOneColor = cellCount === capturedCellsCount;
        return boardIsOneColor;
    }

    isGameOver(): boolean {
        const ranOutOfTurns = this.turnCount > MAX_TURN_COUNT;
        return this.won() || ranOutOfTurns;
    }

    changeColor(color: Color) {
        // if (color == this.currentColor) return;

        const capturedCells = this.getCapturedCells();
        capturedCells.forEach((cell) => cell.setColor(color));
        this.currentColor = color;
        this.turnCount++;
    }

    private getCapturedCells() {
        const getAdjacentCells = (cell: ICell) =>
            cell.adjacentCellsWithColor(this.currentColor);
        return this.traverseCells(getAdjacentCells);
    }

    private getAllCells() {
        const getAllAdjacentCells = (cell: ICell) => cell.adjacentCells();
        return this.traverseCells(getAllAdjacentCells);
    }

    private traverseCells(getAdjacentCells: (cell: ICell) => IMutableCell[]) {
        const traversedCells = new Set<IMutableCell>();
        const stack = [this.startingCell];
        while (stack.length > 0) {
            const currentCell = stack.pop() as IMutableCell;
            if (traversedCells.has(currentCell)) continue;
            traversedCells.add(currentCell);
            const adjacentCells = getAdjacentCells(currentCell);
            const newlyDiscoveredCells = adjacentCells.filter(
                (cell) => !traversedCells.has(cell)
            );
            stack.push(...newlyDiscoveredCells);
        }
        return traversedCells;
    }
}

export class RectangularBoard extends ABoard {
    constructor(width: number, height: number) {
        RectangularBoard.checkBoardDimensions(width, height);
        const startingCell = RectangularBoard.constructCellBoard(width, height);
        super(startingCell);
    }

    static checkBoardDimensions(width: number, height: number) {
        if (width < MINIMUM_WIDTH) {
            throw new Error(
                `board must have a width of at least ${MINIMUM_WIDTH}, but tried to build a board with a width of ${width}`
            );
        }
        if (height < MINIMUM_HEIGHT) {
            throw new Error(
                `board must have a height of at least ${MINIMUM_HEIGHT}, but tried to build a board with a height of ${height}`
            );
        }
    }

    /**
     * construct a board with connected cells.
     *
     * @param width the width of the board
     * @param height the height of the board
     * @returns the bottom left cell of the board
     */
    static constructCellBoard(width: number, height: number) {
        RectangularBoard.checkBoardDimensions(width, height);
        let previousRow: Cell[] = RectangularBoard.constructCellRow(width);
        const startingCell = previousRow[0];

        for (let rowIndex = 1; rowIndex < height; rowIndex++) {
            const currentRow = RectangularBoard.constructCellRow(width);
            for (let i = 0; i < currentRow.length; i++) {
                const previousRowCell = previousRow[i];
                const currentRowCell = currentRow[i];
                previousRowCell.setBottom(currentRowCell);
                currentRowCell.setTop(previousRowCell);
            }
            previousRow = currentRow;
        }
        return startingCell;
    }

    static constructCellRow(width: number) {
        let previousCell = new Cell(getRandomColor());
        const row = [previousCell];
        for (let columnIndex = 1; columnIndex < width; columnIndex++) {
            const currentCell = new Cell(getRandomColor());
            row.push(currentCell);
            previousCell.setRight(currentCell);
            currentCell.setLeft(previousCell);

            previousCell = currentCell;
        }
        return row;
    }
}
