import { createLogger } from '../logger.js';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
const logger = createLogger('commands:status');
export async function status() {
    try {
        const cwd = process.cwd();
        const pidPath = join(cwd, '.toolbox', 'pid');
        //check if file exists
        const pidStr = await readFile(pidPath, 'utf-8').catch(() => null);
        if (!pidStr) {
            logger.highlight(`App is stopped (no PID file found)`);
            return;
        }
        const pid = Number(pidStr);
        try {
            //check if process exists without killing it
            process.kill(pid, 0);
            logger.highlight(`App is running (PID ${pid})`);
        } catch (err) {
            if (err.code === 'ESRCH') {
                //Process doesnt exist
                logger.warning(`PD file exists but process isnt running`);
            } else if (err.code === 'EPERM') {
                logger.warning(
                    `Process exists (PID ${pid}) but no permissions to signal it `
                );
            } else {
                logger.warning(`Error checking process status `, err);
            }
        }
    } catch (error) {
        logger.error('Failed status check');
        console.error(error);
    }
}
