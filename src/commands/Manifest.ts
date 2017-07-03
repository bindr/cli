import * as fs from 'fs';
import * as path from 'path';
import {CommandModule} from 'yargs';

const directoryTree = require('directory-tree');

import {loadConfig} from '../config/Config';
import {ManifestEntry, Section, Document} from '../models/Manifest';
import {getFileRelativePath, getFileUrl} from '../helpers/PathHelper';

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
    const manifestRoot = new Section();
    manifestRoot.title = 'root';

    if (treeRoot.children && treeRoot.children.length) {
        manifestRoot.children = recurseOverDirectoryTree(treeRoot.children);
    }

    return manifestRoot;
}

function recurseOverDirectoryTree(treeEntries: ITreeEntry[]): ManifestEntry[] {
    let manifestEntries: ManifestEntry[] = [];

    for (let entry of treeEntries) {
        const manifestEntry = processDirectoryTreeEntry(entry);

        if (entry.type === 'directory') {
            const dir = entry as ITreeDirectory;

            if (dir.children && dir.children.length) {
                manifestEntry.children = recurseOverDirectoryTree(dir.children);
            }
        }

        manifestEntries.push(manifestEntry);
    }

    return manifestEntries;
}

function processDirectoryTreeEntry(treeEntry: ITreeEntry): ManifestEntry {

    const orderTitleTuple = processEntryTitle(treeEntry.name);

    if (treeEntry.type === 'directory') {
        const section = new Section();
        section.title = orderTitleTuple.title;
        section.order = orderTitleTuple.order;
        return section;
    }
    else if (treeEntry.type === 'file') {
        const document = new Document();
        document.title = orderTitleTuple.title;
        document.order = orderTitleTuple.order;
        document.url = getFileUrl(treeEntry.path);
        document.filePath = getFileRelativePath(treeEntry.path);
        return document;
    }

    return null;
}

function processEntryTitle(rawName: string): { order: number, title: string } {
    let tokens = rawName
        .replace(/\.md$/, '')
        .split('_');

    const orderPart = tokens[0];
    const order = parseInt(orderPart);

    if (!orderPart || !isNaN(order)) {
        tokens.splice(0, 1);
    }

    const title = tokens.join(' ');

    return {order, title};
}