import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CampFireSharedModule } from 'app/shared';
import {
    SprintMpmComponent,
    SprintMpmDetailComponent,
    SprintMpmUpdateComponent,
    SprintMpmDeletePopupComponent,
    SprintMpmDeleteDialogComponent,
    sprintRoute,
    sprintPopupRoute
} from './';

const ENTITY_STATES = [...sprintRoute, ...sprintPopupRoute];

@NgModule({
    imports: [CampFireSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SprintMpmComponent,
        SprintMpmDetailComponent,
        SprintMpmUpdateComponent,
        SprintMpmDeleteDialogComponent,
        SprintMpmDeletePopupComponent
    ],
    entryComponents: [SprintMpmComponent, SprintMpmUpdateComponent, SprintMpmDeleteDialogComponent, SprintMpmDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampFireSprintMpmModule {}
