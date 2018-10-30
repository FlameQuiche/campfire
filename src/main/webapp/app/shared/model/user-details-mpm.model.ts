export interface IUserDetailsMpm {
    id?: string;
    userId?: string;
    teamName?: string;
    teamId?: string;
}

export class UserDetailsMpm implements IUserDetailsMpm {
    constructor(public id?: string, public userId?: string, public teamName?: string, public teamId?: string) {}
}
