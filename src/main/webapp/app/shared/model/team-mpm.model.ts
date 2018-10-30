import { ISprintMpm } from 'app/shared/model//sprint-mpm.model';
import { IFolderMpm } from 'app/shared/model//folder-mpm.model';
import { IUserDetailsMpm } from 'app/shared/model//user-details-mpm.model';
import { IIdeaMpm } from 'app/shared/model//idea-mpm.model';

export interface ITeamMpm {
    id?: string;
    name?: string;
    sprints?: ISprintMpm[];
    folders?: IFolderMpm[];
    members?: IUserDetailsMpm[];
    ideas?: IIdeaMpm[];
}

export class TeamMpm implements ITeamMpm {
    constructor(
        public id?: string,
        public name?: string,
        public sprints?: ISprintMpm[],
        public folders?: IFolderMpm[],
        public members?: IUserDetailsMpm[],
        public ideas?: IIdeaMpm[]
    ) {}
}
