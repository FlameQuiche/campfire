import { Moment } from 'moment';
import { IMoodMpm } from 'app/shared/model//mood-mpm.model';
import { IActionMpm } from 'app/shared/model//action-mpm.model';

export interface ISprintMpm {
    id?: string;
    name?: string;
    beginDate?: Moment;
    endDate?: Moment;
    teamName?: string;
    teamId?: string;
    moods?: IMoodMpm[];
    actions?: IActionMpm[];
}

export class SprintMpm implements ISprintMpm {
    constructor(
        public id?: string,
        public name?: string,
        public beginDate?: Moment,
        public endDate?: Moment,
        public teamName?: string,
        public teamId?: string,
        public moods?: IMoodMpm[],
        public actions?: IActionMpm[]
    ) {}
}
