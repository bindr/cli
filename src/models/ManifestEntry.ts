export class ManifestEntry {
    title: string;
    order: number;
    type: ManifestEntryType;

    children: ManifestEntry[];
}

export enum ManifestEntryType {
    Section = 'section',
    Document = 'document'
}