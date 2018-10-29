export const enum Status {
    BLOCKED = 'BLOCKED',
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    DEPRECATED = 'DEPRECATED'
}

export interface IActionMpm {
    id?: string;
    description?: string;
    responsible?: string;
    status?: Status;
    sprintName?: string;
    sprintId?: string;
}

export class ActionMpm implements IActionMpm {
    constructor(
        public id?: string,
        public description?: string,
        public responsible?: string,
        public status?: Status,
        public sprintName?: string,
        public sprintId?: string
    ) {}
}
