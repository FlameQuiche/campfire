import { Moment } from 'moment';

export interface IMoodMpm {
    id?: string;
    rank?: number;
    date?: Moment;
    userId?: string;
    sprintName?: string;
    sprintId?: string;
}

export class MoodMpm implements IMoodMpm {
    constructor(
        public id?: string,
        public rank?: number,
        public date?: Moment,
        public userId?: string,
        public sprintName?: string,
        public sprintId?: string
    ) {}
}
