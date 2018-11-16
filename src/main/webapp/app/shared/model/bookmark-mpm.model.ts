export interface IBookmarkMpm {
    id?: string;
    name?: string;
    url?: string;
    tags?: any;
    teamName?: string;
    teamId?: string;
}

export class BookmarkMpm implements IBookmarkMpm {
    constructor(
        public id?: string,
        public name?: string,
        public url?: string,
        public tags?: any,
        public teamName?: string,
        public teamId?: string
    ) {}
}
