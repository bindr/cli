import {ManifestEntry, ManifestEntryType} from './ManifestEntry';
import {parseTitle} from '../helpers/TitleParser';

export class Section extends ManifestEntry {
    constructor(treeEntry: ITreeEntry) {
        super();

        this.type = ManifestEntryType.Section;
        this.children = [];

        convertTreeEntryToSection(this, treeEntry);
    }
}

function convertTreeEntryToSection(self: Section, treeEntry: ITreeEntry) {
    const orderTitleTuple = parseTitle(treeEntry.name);

    self.title = orderTitleTuple.title;
    self.order = orderTitleTuple.order;
}