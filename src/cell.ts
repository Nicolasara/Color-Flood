import { Color } from "./color";

export interface ICell {
    getColor(): Color;
    getTopCell(): ICell | null;
    getRightCell(): ICell | null;
    getBottomCell(): ICell | null;
    getLeftCell(): ICell | null;
    adjacentCells(): IMutableCell[];
    adjacentCellsWithColor(color: Color): IMutableCell[];
}

export interface IMutableCell extends ICell {
    setColor(color: Color): void;
}

export class Cell implements IMutableCell {
    private top: Cell | null;
    private right: Cell | null;
    private bottom: Cell | null;
    private left: Cell | null;

    constructor(private color: Color) {
        this.top = null;
        this.right = null;
        this.bottom = null;
        this.left = null;
    }

    getColor(): Color {
        return this.color;
    }

    getTopCell(): ICell | null {
        return this.top;
    }

    getRightCell(): ICell | null {
        return this.right;
    }

    getBottomCell(): ICell | null {
        return this.bottom;
    }

    getLeftCell(): ICell | null {
        return this.left;
    }

    setColor(color: Color): void {
        this.color = color;
    }

    adjacentCells(): IMutableCell[] {
        const adjacentCells: Cell[] = [];
        if (this.top) adjacentCells.push(this.top);
        if (this.right) adjacentCells.push(this.right);
        if (this.bottom) adjacentCells.push(this.bottom);
        if (this.left) adjacentCells.push(this.left);
        return adjacentCells;
    }

    adjacentCellsWithColor(color: Color): IMutableCell[] {
        const adjacentCells = this.adjacentCells();
        return adjacentCells.filter((cell) => cell.getColor() == color);
    }

    setTop(cell: Cell) {
        this.top = cell;
    }

    setRight(cell: Cell) {
        this.right = cell;
    }

    setBottom(cell: Cell) {
        this.bottom = cell;
    }

    setLeft(cell: Cell) {
        this.left = cell;
    }
}
