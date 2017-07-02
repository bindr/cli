const readdir = require('recursive-readdir');

import {loadConfig} from '../config/Config';

export async function handleManifest() {
    const config = loadConfig();

    const docsPath = config.docsPath || './docs/';

    const files = await readdir(docsPath);

    console.log(files);
}