import fs from 'node:fs/promises';
import { join } from 'node:path';
import { createLogger } from '../logger.js';
import { fileURLToPath } from 'node:url';
const logger = createLogger('commands:template');
export async function template(name) {
    if (!name) {
        logger.warning('Template name required');
        return;
    }
    const __dirname = fileURLToPath(new URL('.', import.meta.url));
    const cwd = process.cwd();

    const src = join(
        __dirname,
        '../../templates',
        name === 'gitignore' ? 'gitignore' : 'README.md'
    );
    const dest = join(cwd, name === 'gitignore' ? 'gitignore' : 'README.md');
    await fs.copyFile(src, dest);
    logger.highlight(`Created ${dest}`);
}
