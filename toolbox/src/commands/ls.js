import fs from 'node:fs/promises';
import { join } from 'node:path';
import { createLogger } from '../logger.js';
const logger = createLogger('commands:ls');
export async function ls(dir = '.', ext) {
    const cwd = process.cwd();
    const target = join(cwd, dir);
    async function walk(current) {
        const entries = await fs.readdir(current, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = join(current, entry.name);
            if (entry.isDirectory()) {
                await walk(fullPath);
            } else {
                if (!ext || entry.name.endsWith(ext)) {
                    const stat = await fs.stat(fullPath);
                    logger.highlight(
                        `${fullPath.replace(cwd, +'\\', '')} - ${
                            stat.size
                        } bytes`
                    );
                }
            }
        }
    }
    await walk(target);
}
