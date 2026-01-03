import { createLogger } from '../logger.js';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import { cosmiconfig } from 'cosmiconfig';
import betterAjvErrors from 'better-ajv-errors';
import Ajv from 'ajv';
//resolve the path to schema
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//load schema
const schemaPath = join(__dirname, '../config/schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
const logger = createLogger('config:config-mng');
const explorer = cosmiconfig('toolbox');
const ajv = new Ajv({ strict: false });
export async function getConfig() {
    const result = await explorer.search(process.cwd());
    if (!result) {
        logger.warning('Failed to locate config resulting to default');
        return { port: 3000 };
    } else {
        const isValid = ajv.validate(schema, result.config);
        if (!isValid) {
            logger.warning('Invalid config was supplied');
            console.log();
            console.log(betterAjvErrors(schema, result.config, ajv.errors));
            process.exit(1);
        }
        logger.debug('Found configuration', result.config);
        return result.config;
    }
}
