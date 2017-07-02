import * as fs from 'fs';
import * as path from 'path';

const readdir = require('recursive-readdir');

import {loadConfig} from '../config/Config';

export async function handleManifest() {
    const config = loadConfig();

    const docsPath = path.resolve(config.docsPath || './docs/');

    if (!fs.existsSync(docsPath)) {
        console.error(`ERROR: Docs folder not found at '${docsPath}'`);
        return;
    }

    let files = await readdir(docsPath) as string[];
    files = files
        .map(f => path.relative(process.cwd(), f).replace(/\\/g, '/'));

    console.log(files);
}