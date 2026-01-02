//this file will return a logger that receives a name and returns a logger object
import chalk from 'chalk';
import debug from 'debug';
export function createLogger(name) {
    return {
        log: (...args) => console.log(chalk.gray(...args)),
        warning: (...args) => console.log(chalk.yellow(...args)),
        highlight: (...args) => console.log(chalk.bgCyanBright(...args)),
        debug: debug(name),
    };
}
