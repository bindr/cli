import * as path from 'path';

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

    if (options.stripExtension) {
        fileUrl = fileUrl.replace(/\.(md|html)$/, '');
    }

    if (options.stripIndex)
        fileUrl = fileUrl.replace(/\/index/, '/');

    return fileUrl;
}