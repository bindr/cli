import * as fs from 'fs';
import * as path from 'path';
import {CommandModule} from 'yargs';

const directoryTree = require('directory-tree');

import {loadConfig} from '../config/Config';
import {ManifestEntry} from '../models/ManifestEntry';
import {Section} from '../models/Section';
import {Document} from '../models/Document';

export const Manifest: CommandModule = {
    command: 'manifest',
    describe: 'Parses the docs directory and generates the manifest to be used for navigation.',
    handler: handleManifest
};

function handleManifest() {
    const config = loadConfig();

    const docsPath = path.resolve(config.docsPath || './docs/');

    if (!fs.existsSync(docsPath) || !fs.statSync(docsPath).isDirectory()) {
        console.error(`ERROR: Docs folder not found at '${docsPath}'`);
        return;
    }

    let tree = directoryTree(docsPath) as ITreeDirectory;

    const manifest = createManifestFromTree(tree);

    const manifestPath = config.manifestOut || 'manifest.json';
    fs.writeFileSync(manifestPath, JSON.stringify(manifest));

    console.log(`Manifest written to '${manifestPath}'.`);
}

function createManifestFromTree(treeRoot: ITreeDirectory): ManifestEntry {
    return recurseOverTreeEntry(treeRoot);
}

function recurseOverTreeEntry(treeEntry: ITreeEntry): ManifestEntry {
    const manifestEntry = processDirectoryTreeEntry(treeEntry);

    if (treeEntry.type === 'directory') {
        const dir = treeEntry as ITreeDirectory;

        if (dir.children && dir.children.length) {
            manifestEntry.children = [];

            for (let child of dir.children) {
                const manifestEntryChild = recurseOverTreeEntry(child);
                manifestEntry.children.push(manifestEntryChild);
            }

            manifestEntry.children
                .sort((left, right) => left.order - right.order);
        }
    }

    return manifestEntry;
}

function processDirectoryTreeEntry(treeEntry: ITreeEntry): ManifestEntry {
    if (treeEntry.type === 'directory') {
        return new Section(treeEntry);
    }
    else if (treeEntry.type === 'file') {
        return new Document(treeEntry);
    }
    return null;
}