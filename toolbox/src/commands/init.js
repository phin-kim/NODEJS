import { write } from 'node:fs';
import { mkdir, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { createLogger } from '../logger.js';
const logger = createLogger('commands:init.js');
export async function init() {
    const cwd = process.cwd(); //where we are running this script from
    //paths
    const srcDir = join(cwd, 'src');
    const indexJsPath = join(srcDir, 'index.js');
    const pkgJsonPath = join(cwd, 'package.json');
    const configPath = join(cwd, 'tool.config.js');
    //creat a src directory
    await mkdir(srcDir, { recursive: true });
    //write to src/index.js
    await writeFile(
        indexJsPath,
        `console.log("Hello from your app");\n`,
        'utf-8'
    );
    //write to package.json
    await writeFile(
        pkgJsonPath,
        JSON.stringify(
            {
                name: 'my-app',
                version: '1.0.9',
                type: 'module',
                scripts: { start: 'node src/index.js' },
            },
            null,
            2
        ),
        'utf-8'
    );
    //write to too.config.js
    await writeFile(configPath, `export default {\n port: 3000\n};\n`, 'utf-8');
    //validate list files
    const files = await readdir(cwd);
    logger.log('Project initialized files created');
    console.log(files);
}
