import chalk from 'chalk';
import { createLogger } from '../logger.js';
const logger = createLogger('commands:start');
export function start(config) {
    logger.highlight('Starting the app');
    logger.debug('Received configuration ', config);
}
