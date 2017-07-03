import * as fs from 'fs';
import * as path from 'path';

const directoryTree = require('directory-tree');

import {loadConfig} from '../config/Config';
import {ManifestEntry, Section, Document} from '../models/Manifest';

export async function handleManifest() {
    const config = loadConfig();

    const docsPath = path.resolve(config.docsPath || './docs/');

    if (!fs.existsSync(docsPath)) {
        console.error(`ERROR: Docs folder not found at '${docsPath}'`);
        return;
    }

    let tree = directoryTree(docsPath) as ITreeEntry[];

    const manifest = createManifestFromTree(tree);

    fs.writeFileSync('manifest.json', JSON.stringify(manifest));
}

function createManifestFromTree(treeEntries: ITreeEntry[]): ManifestEntry[] {
    let manifestEntries: ManifestEntry[] = [];

    for (let entry of treeEntries) {
        const manifestEntry = processDirectoryTreeEntry(entry);

        if (entry.type === 'directory') {
            const dir = entry as ITreeDirectory;

            if (dir.children && dir.children.length) {
                manifestEntry.children = createManifestFromTree(dir.children);
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