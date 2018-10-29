import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CampFireSharedModule } from 'app/shared';
import {
    TeamMpmComponent,
    TeamMpmDetailComponent,
    TeamMpmUpdateComponent,
    TeamMpmDeletePopupComponent,
    TeamMpmDeleteDialogComponent,
    teamRoute,
    teamPopupRoute
} from './';

const ENTITY_STATES = [...teamRoute, ...teamPopupRoute];

@NgModule({
    imports: [CampFireSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TeamMpmComponent,
        TeamMpmDetailComponent,
        TeamMpmUpdateComponent,
        TeamMpmDeleteDialogComponent,
        TeamMpmDeletePopupComponent
    ],
    entryComponents: [TeamMpmComponent, TeamMpmUpdateComponent, TeamMpmDeleteDialogComponent, TeamMpmDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampFireTeamMpmModule {}
