import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CampFireSharedModule } from 'app/shared';
import { CampFireAdminModule } from 'app/admin/admin.module';
import {
    MoodMpmComponent,
    MoodMpmDetailComponent,
    MoodMpmUpdateComponent,
    MoodMpmDeletePopupComponent,
    MoodMpmDeleteDialogComponent,
    moodRoute,
    moodPopupRoute
} from './';

const ENTITY_STATES = [...moodRoute, ...moodPopupRoute];

@NgModule({
    imports: [CampFireSharedModule, CampFireAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MoodMpmComponent,
        MoodMpmDetailComponent,
        MoodMpmUpdateComponent,
        MoodMpmDeleteDialogComponent,
        MoodMpmDeletePopupComponent
    ],
    entryComponents: [MoodMpmComponent, MoodMpmUpdateComponent, MoodMpmDeleteDialogComponent, MoodMpmDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampFireMoodMpmModule {}
