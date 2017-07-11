import {ManifestEntry, ManifestEntryType} from './ManifestEntry';
import {processEntryTitle} from '../helpers/ManifestEntryHelper';

export class Section extends ManifestEntry {
    constructor(treeEntry: ITreeEntry) {
        super();

        this.type = ManifestEntryType.Section;
        this.children = [];

        convertTreeEntryToSection(this, treeEntry);
    }
}

function convertTreeEntryToSection(self: Section, treeEntry: ITreeEntry) {
    const orderTitleTuple = processEntryTitle(treeEntry.name);

    self.title = orderTitleTuple.title;
    self.order = orderTitleTuple.order;
}