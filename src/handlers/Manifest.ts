const readdir = require('recursive-readdir');
const appConfig = require('../../config.json') as IAppConfig;

const bindrConfig = require(appConfig.configFile) as IBindrConfig;

export async function handleManifest() {
    const docsPath = bindrConfig.docs || './docs/';

    const files = await readdir(docsPath);

    console.log(files);
}