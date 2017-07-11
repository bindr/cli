import * as path from 'path';
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

export function getFileRelativePath(fullPath: string): string {
    fullPath = path.normalize(fullPath);
    const relativePath = path.relative(process.cwd(), fullPath);

    return relativePath.replace(/\\/g, '/');
}

export function getFileUrl(fullPath: string, options?: FileUrlOptions): string {
    const relativePath = getFileRelativePath(fullPath);

    let fileUrl = relativePath
        .replace(/^docs\//, '');

    options = options ||
        {
            stripIndex: false,
            stripExtension: true
        };

    if (options.stripExtension)
        fileUrl = fileUrl.replace(/\.md$/, '');

    if (options.stripIndex)
        fileUrl = fileUrl.replace(/\/index/, '/');

    return fileUrl;
}

export function processEntryTitle(rawName: string): { order: number, title: string } {
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