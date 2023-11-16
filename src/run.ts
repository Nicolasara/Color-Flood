import { IMutableBoard, RectangularBoard } from "./board";
import { IGui, TerminalGui } from "./gui";
import { Player, TerminalPlayer } from "./player";
import { playGame } from "./referee";
import { IStrategy, InesStrategy, RandomStrategy } from "./strategy";
import yargs from "yargs";

const DEFAULT_HEIGHT = 5;
const DEFAULT_WIDTH = 5;

const argv = defineArgv();

const board = parseBoardArgs(argv);
const gui = parseGuiArgs(argv);
const strategy = new InesStrategy();
const player = new Player(strategy);

console.log(argv.height);

playGame(board, player, gui);

type yargsArgv = {
    board: string;
    width: number;
    height: number;
    strategy: string;
    gui: string;
};

function defineArgv(): yargsArgv {
    let argvBuilder = yargs(process.argv.slice(2));
    argvBuilder = defineBoardArgs(argvBuilder);
    argvBuilder = defineGuiArgs(argvBuilder);
    const argv = argvBuilder.help().argv;
    return argv as unknown as yargsArgv;
}

function defineBoardArgs(argv: yargs.Argv) {
    return argv
        .option("board", {
            alias: "b",
            type: "string",
            describe: "Type of board",
            choices: ["rectangular"],
            default: "rectangular",
        })
        .option("width", {
            alias: "w",
            type: "number",
            describe: "Width of the rectangular board",
            default: DEFAULT_WIDTH,
        })
        .option("height", {
            alias: "h",
            type: "number",
            describe: "Height of the rectangular board",
            default: DEFAULT_HEIGHT,
        });
}

function defineStrategyArgs(argv: yargs.Argv) {
    return argv.option("strategy", {
        type: "string",
        describe: "Type of strategy",
        choices: ["random"],
        default: "random",
    });
}

function defineGuiArgs(argv: yargs.Argv) {
    return argv.option("gui", {
        type: "string",
        describe: "Type of gui",
        choices: ["terminal"],
        default: "terminal",
    });
}

function parseBoardArgs(argv: yargsArgv): IMutableBoard {
    switch (argv.board) {
        case "rectangular":
            return new RectangularBoard(argv.width, argv.height);
        default:
            throw new Error(`Unrecognized board type: ${argv.board}`);
    }
}

function parseStrategyArgs(argv: yargsArgv): IStrategy {
    switch (argv.strategy) {
        case "random":
            return new RandomStrategy();
        default:
            throw new Error(`Unrecognized strategy type: ${argv.strategy}`);
    }
}

function parseGuiArgs(argv: yargsArgv): IGui {
    switch (argv.gui) {
        case "terminal":
            return new TerminalGui(board);
        default:
            throw new Error(`Unrecognized gui type: ${argv.gui}`);
    }
}
