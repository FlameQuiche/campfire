import { ISprintMpm } from 'app/shared/model//sprint-mpm.model';
import { IFolderMpm } from 'app/shared/model//folder-mpm.model';

export interface ITeamMpm {
    id?: string;
    name?: string;
    sprints?: ISprintMpm[];
    folders?: IFolderMpm[];
}

export class TeamMpm implements ITeamMpm {
    constructor(public id?: string, public name?: string, public sprints?: ISprintMpm[], public folders?: IFolderMpm[]) {}
}
