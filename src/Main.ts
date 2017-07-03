import {handleManifest} from './handlers/Manifest';

export default async function main(argv: IAppArguments) {
    if (argv.manifest) {
        await handleManifest();
    }
}