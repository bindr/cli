import * as fs from 'fs';
import * as path from 'path';

const directoryTree = require('directory-tree');

import {loadConfig} from '../config/Config';
import {ManifestEntry, Section, Document} from '../models/Manifest';

export async function handleManifest() {
    const config = loadConfig();

    const docsPath = path.resolve(config.docsPath || './docs/');

    if (!fs.existsSync(docsPath) || !fs.statSync(docsPath).isDirectory()) {
        console.error(`ERROR: Docs folder not found at '${docsPath}'`);
        return;
    }

    let tree = directoryTree(docsPath) as ITreeDirectory;

    const manifest = createManifestFromTree(tree);

    fs.writeFileSync('manifest.json', JSON.stringify(manifest));
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

    if (treeEntry.type === 'directory') {
        const section = new Section();
        section.title = treeEntry.name;
        return section;
    }
    else if (treeEntry.type === 'file') {
        const document = new Document();
        document.title = treeEntry.name;
        document.url = treeEntry.path;
        document.filePath = treeEntry.path;
        return document;
    }

    return null;
}