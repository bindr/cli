import {ManifestEntry} from '../models/ManifestEntry';
import {Section} from '../models/Section';
import {Document} from '../models/Document';

export function processDirectoryTreeEntry(treeEntry: ITreeEntry): ManifestEntry | null {
    if (isSection(treeEntry)) {
        return new Section(treeEntry);
    }
    else if (isDocument(treeEntry)) {
        return new Document(treeEntry);
    }
    return null;
}

function isSection(treeEntry: ITreeEntry): boolean {
    return treeEntry.type === 'directory';
}

function isDocument(treeEntry: ITreeEntry): boolean {
    return treeEntry.type === 'file' &&
        (treeEntry.name.endsWith('.md') || treeEntry.name.endsWith('.html'));
}