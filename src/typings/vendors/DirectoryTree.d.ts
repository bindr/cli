interface ITreeEntry {
    path: string,
    name: string,
    size: number,
    type: ('directory' | 'file')
}

interface ITreeDirectory extends ITreeEntry {
    children: ITreeEntry[];
}

interface ITreeFile extends ITreeEntry {
    extension: string;
}