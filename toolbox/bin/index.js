#!/usr/bin/env node
import arg from 'arg';
import chalk from 'chalk';

import { createLogger } from '../src/logger.js';
import { init } from '../src/commands/init.js';
import { start } from '../src/commands/start.js';
import { stop } from '../src/commands/stop.js';
import { status } from '../src/commands/status.js';
import { ls } from '../src/commands/ls.js';
import { template } from '../src/commands/template.js';
const logger = createLogger('bin');
try {
    const args = arg({
        '--init': Boolean,
        '--start': Boolean,
        '--stop': Boolean,
        '--status': Boolean,
        '--ls': String,
        '--ext': String,
        '--template': Boolean,
    });
    if (args['--init']) {
        logger.highlight('The app is being initalized');
        await init();
    } else if (args['--start']) {
        await start();
    } else if (args['--stop']) {
        await stop();
    } else if (args['--status']) {
        await status();
    } else if (args['--ls'] !== undefined) {
        await ls(args['--ls'] || '.', args['--ext']);
    } else if (args['--template']) {
        await template(args['--template']);
    }
    console.log('Port in child', process.env.PORT);
} catch (error) {
    logger.error(error.message);
    usage();
}

export function usage() {
    console.log('');
    console.log(
        chalk.whiteBright('Usage:'),
        chalk.cyanBright('toolbox'),
        chalk.yellowBright('[command]')
    );

    console.log('');
    console.log(chalk.whiteBright('Commands:'));

    console.log(
        `  ${chalk.greenBright('--init')}\t\t${chalk.gray(
            'Initialize the tool configuration'
        )}`
    );

    console.log(
        `  ${chalk.greenBright('--start')}\t\t${chalk.gray(
            'Start the application'
        )}`
    );

    console.log(
        `  ${chalk.greenBright('--stop')}\t\t${chalk.gray(
            'Stop the running application'
        )}`
    );

    console.log(
        `  ${chalk.greenBright('--status')}\t\t${chalk.gray(
            'Show current application status'
        )}`
    );

    console.log('');
}
