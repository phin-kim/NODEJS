import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';

import { join } from 'node:path';
import { getConfig } from './config-mng.js';
import { createLogger } from '../logger.js';
const logger = createLogger('commands:start');
export async function start() {
    const cwd = process.cwd();
    //load config
    const config = await getConfig();
    logger.debug('Using config', config);
    //path to app entry
    const entry = join(cwd, 'node_modules', 'toolbox', 'bin', 'index.js');
    logger.highlight('Starting the app');
    //spawn child process
    const child = spawn('node', [entry], {
        cwd,
        stdio: 'inherit',
        env: { ...process.env, PORT: String(config.port) },
    });
    //generate a file for the pid
    await fs.mkdir(join(cwd, '.toolbox'), { recursive: true });
    await fs.writeFile(join(cwd, '.toolbox', 'pid'), String(child.pid));
    logger.debug('Saved PID to ', join(cwd, '.toolbox', 'pid'));
    //handle exit
    child.on('exit', async (code) => {
        logger.warning(`App exited with code ${code}`);
        await fs.unlink(join(cwd, '.toolbox', 'pid')).catch(() => {});
        logger.debug(`Removed PID file on exit`);
    });
    //handle errors
    child.on('error', (error) => {
        logger.warning('Failed to start app');
        console.error(error);
    });
}
