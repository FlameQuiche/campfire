import { Moment } from 'moment';

export interface IMoodMpm {
    id?: string;
    rank?: number;
    date?: Moment;
    userLogin?: string;
    userId?: string;
    sprintName?: string;
    sprintId?: string;
}

export class MoodMpm implements IMoodMpm {
    constructor(
        public id?: string,
        public rank?: number,
        public date?: Moment,
        public userLogin?: string,
        public userId?: string,
        public sprintName?: string,
        public sprintId?: string
    ) {}
}
