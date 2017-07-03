export function getEntryTitle(rawName: string): string {
    let tokens = rawName
        .replace(/\.md$/, '')
        .split('_');

    return tokens.join(' ');
}