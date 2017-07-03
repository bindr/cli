export class ManifestEntry {
    title: string;
    type: ManifestEntryType;

    children: ManifestEntry[];
}

export enum ManifestEntryType {
    Section = 'section',
    Document = 'document'
}

export class Section extends ManifestEntry {
    constructor() {
        super();

        this.type = ManifestEntryType.Section;
        this.children = [];
    }
}

export class Document extends ManifestEntry {
    url: string;
    filePath: string;

    constructor() {
        super();

        this.type = ManifestEntryType.Document;
    }
}