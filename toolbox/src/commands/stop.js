import fs from 'node:fs/promises';
import { join } from 'node:path';
import { createLogger } from '../logger.js';
const logger = createLogger('commands:stop');
export async function stop() {
    const pidPath = join(process.cwd(), '.toolbox', 'pid');
    try {
        //check if pid exist
        const pidStr = await fs.readFile(pidPath, 'utf-8');
        const pid = Number(pidStr);
        if (isNaN(pid)) {
            logger.warning('PID file is invalid');
            return;
        }
        //attempt to kill theprocess
        try {
            process.kill(pid, 'SIGTERM'); //gracefull termination
            logger.highlight(`Stopped proccess with PID ${pid}`);
        } catch (error) {
            if (error.code === 'ESRCH') {
                //no such process already exited
                logger.warning(`Process with PID: ${pid} is not running`);
                await fs.unlink(pidPath).catch(() => {});
                logger.debug(`Removed stale PID file`);
            } else if (error.code === 'EPERM') {
                logger.warning(`No permission to stop process wtih PID:${pid}`);
            } else {
                throw error;
            }
        }
        //remove PID file
        await fs.unlink(pidPath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            //PID File doesnt exist
            logger.warning(`No running process found`);
        } else {
            console.error(error);
        }
    }
}
