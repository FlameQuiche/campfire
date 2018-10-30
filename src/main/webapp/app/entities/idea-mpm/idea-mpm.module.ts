import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CampFireSharedModule } from 'app/shared';
import {
    IdeaMpmComponent,
    IdeaMpmDetailComponent,
    IdeaMpmUpdateComponent,
    IdeaMpmDeletePopupComponent,
    IdeaMpmDeleteDialogComponent,
    ideaRoute,
    ideaPopupRoute
} from './';

const ENTITY_STATES = [...ideaRoute, ...ideaPopupRoute];

@NgModule({
    imports: [CampFireSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IdeaMpmComponent,
        IdeaMpmDetailComponent,
        IdeaMpmUpdateComponent,
        IdeaMpmDeleteDialogComponent,
        IdeaMpmDeletePopupComponent
    ],
    entryComponents: [IdeaMpmComponent, IdeaMpmUpdateComponent, IdeaMpmDeleteDialogComponent, IdeaMpmDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampFireIdeaMpmModule {}
