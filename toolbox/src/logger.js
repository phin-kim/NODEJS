import debug from 'debug';
import chalk from 'chalk';
export function createLogger(name) {
    return {
        log: (...args) => console.log(chalk.gray(...args)),
        warning: (...args) => console.log(chalk.yellow(...args)),
        highlight: (...args) => console.log(chalk.bgCyanBright(...args)),
        error: (...args) => console.log(chalk.redBright(...args)),
        debug: debug(name),
    };
}
