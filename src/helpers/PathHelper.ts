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