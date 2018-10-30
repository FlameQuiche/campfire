export interface IIdeaMpm {
    id?: string;
    description?: string;
    userId?: string;
    teamName?: string;
    teamId?: string;
}

export class IdeaMpm implements IIdeaMpm {
    constructor(
        public id?: string,
        public description?: string,
        public userId?: string,
        public teamName?: string,
        public teamId?: string
    ) {}
}
