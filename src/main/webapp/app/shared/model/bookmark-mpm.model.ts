export interface IBookmarkMpm {
    id?: string;
    name?: string;
    url?: string;
    folderName?: string;
    folderId?: string;
}

export class BookmarkMpm implements IBookmarkMpm {
    constructor(public id?: string, public name?: string, public url?: string, public folderName?: string, public folderId?: string) {}
}
