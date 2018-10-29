export interface IIdeaMpm {
    id?: string;
    description?: string;
    userLogin?: string;
    userId?: string;
}

export class IdeaMpm implements IIdeaMpm {
    constructor(public id?: string, public description?: string, public userLogin?: string, public userId?: string) {}
}
