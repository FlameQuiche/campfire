import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CampFireSharedModule } from 'app/shared';
import { CampFireAdminModule } from 'app/admin/admin.module';
import {
    UserDetailsMpmComponent,
    UserDetailsMpmDetailComponent,
    UserDetailsMpmUpdateComponent,
    UserDetailsMpmDeletePopupComponent,
    UserDetailsMpmDeleteDialogComponent,
    userDetailsRoute,
    userDetailsPopupRoute
} from './';

const ENTITY_STATES = [...userDetailsRoute, ...userDetailsPopupRoute];

@NgModule({
    imports: [CampFireSharedModule, CampFireAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserDetailsMpmComponent,
        UserDetailsMpmDetailComponent,
        UserDetailsMpmUpdateComponent,
        UserDetailsMpmDeleteDialogComponent,
        UserDetailsMpmDeletePopupComponent
    ],
    entryComponents: [
        UserDetailsMpmComponent,
        UserDetailsMpmUpdateComponent,
        UserDetailsMpmDeleteDialogComponent,
        UserDetailsMpmDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampFireUserDetailsMpmModule {}
