import yargs from "yargs";

type YargsArgv = {
    [x: string]: unknown;
    count: number;
    _: (string | number)[];
    $0: string;
};

const argv = defineArgv();

const count = argv.count;

for (let index = 0; index < array.length; index++) {
    const element = array[index];
}

function defineArgv(): YargsArgv {
    const argv = yargs
        .command("compare", {})
        .options("count", {
            alias: "c",
            type: "number",
            describe: "Number of games to play",
            default: 1,
        })
        .help().argv;

    return argv as YargsArgv;
}
