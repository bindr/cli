import * as path from 'path';

export function getFileRelativePath(fullPath: string): string {
    fullPath = path.normalize(fullPath);
    const relativePath = path.relative(process.cwd(), fullPath);

    return relativePath.replace(/\\/g, '/');
}

export function getFileUrl(fullPath: string): string {
    const relativePath = getFileRelativePath(fullPath);

    const fileUrl = relativePath
        .replace(/^docs\//, '')
        .replace(/\.md$/, '')
        .replace(/\/index/, '/');

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