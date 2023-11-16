export enum Color {
    RED = "red",
    GREEN = "green",
    BLUE = "blue",
    PURPLE = "purple",
    ORANGE = "orange",
}

export type ColorAcronym = "R" | "G" | "B" | "P" | "O";

export function isColorAcronym(str: string): str is ColorAcronym {
    const validAcronyms = Object.values(ColorAcronym) as string[];
    return validAcronyms.includes(str);
}

export const ColorAcronym: Record<Color, ColorAcronym> = {
    [Color.RED]: "R",
    [Color.GREEN]: "G",
    [Color.BLUE]: "B",
    [Color.PURPLE]: "P",
    [Color.ORANGE]: "O",
};

export const ColorFromAcronym: Record<ColorAcronym, Color> = {
    R: Color.RED,
    G: Color.GREEN,
    B: Color.BLUE,
    P: Color.PURPLE,
    O: Color.ORANGE,
};

// const ColorEnumToRGB: Record<Color, string> = {
//     [Color.RED]: "#FF0000",
//     [Color.GREEN]: "#00FF00",
//     [Color.BLUE]: "#0000FF",
// };

export function getRandomColor(): Color {
    const colorCount = Object.values(Color).length;
    const colorIndex = Math.floor(Math.random() * colorCount);
    return Object.values(Color)[colorIndex];
}
