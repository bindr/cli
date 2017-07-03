import * as yargs from 'yargs';

import {Manifest} from './commands/Manifest';

export default function main() {
    yargs
        .command(Manifest)
        .help()
        .argv;
}