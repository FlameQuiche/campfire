import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CampFireSharedModule } from 'app/shared';
import {
    ActionMpmComponent,
    ActionMpmDetailComponent,
    ActionMpmUpdateComponent,
    ActionMpmDeletePopupComponent,
    ActionMpmDeleteDialogComponent,
    actionRoute,
    actionPopupRoute
} from './';

const ENTITY_STATES = [...actionRoute, ...actionPopupRoute];

@NgModule({
    imports: [CampFireSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ActionMpmComponent,
        ActionMpmDetailComponent,
        ActionMpmUpdateComponent,
        ActionMpmDeleteDialogComponent,
        ActionMpmDeletePopupComponent
    ],
    entryComponents: [ActionMpmComponent, ActionMpmUpdateComponent, ActionMpmDeleteDialogComponent, ActionMpmDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampFireActionMpmModule {}
