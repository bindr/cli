import {ManifestEntry, ManifestEntryType} from './ManifestEntry';
import {getFileRelativePath, getFileUrl, processEntryTitle} from '../helpers/ManifestEntryHelper';

export class Document extends ManifestEntry {
    url: string;
    filePath: string;

    constructor(treeEntry: ITreeEntry) {
        super();

        this.type = ManifestEntryType.Document;

        convertTreeEntryToSection(this, treeEntry);
    }
}

function convertTreeEntryToSection(self: Document, treeEntry: ITreeEntry) {
    const orderTitleTuple = processEntryTitle(treeEntry.name);

    self.title = orderTitleTuple.title;
    self.order = orderTitleTuple.order;

    self.url = getFileUrl(treeEntry.path);
    self.filePath = getFileRelativePath(treeEntry.path);
}