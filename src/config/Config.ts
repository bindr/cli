import * as fs from 'fs';

export const CONFIG_FILE = 'bindr.json';

export function loadConfig(): IConfigOptions {
    if (!fs.existsSync(CONFIG_FILE))
        return {};

    return require(CONFIG_FILE) as IConfigOptions;
}