import { IFolderMpm } from 'app/shared/model//folder-mpm.model';
import { IBookmarkMpm } from 'app/shared/model//bookmark-mpm.model';

export interface IFolderMpm {
    id?: string;
    name?: string;
    teamName?: string;
    teamId?: string;
    subFolders?: IFolderMpm[];
    bookmarks?: IBookmarkMpm[];
}

export class FolderMpm implements IFolderMpm {
    constructor(
        public id?: string,
        public name?: string,
        public teamName?: string,
        public teamId?: string,
        public subFolders?: IFolderMpm[],
        public bookmarks?: IBookmarkMpm[]
    ) {}
}
