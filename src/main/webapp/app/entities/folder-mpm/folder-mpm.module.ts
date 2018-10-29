import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CampFireSharedModule } from 'app/shared';
import {
    FolderMpmComponent,
    FolderMpmDetailComponent,
    FolderMpmUpdateComponent,
    FolderMpmDeletePopupComponent,
    FolderMpmDeleteDialogComponent,
    folderRoute,
    folderPopupRoute
} from './';

const ENTITY_STATES = [...folderRoute, ...folderPopupRoute];

@NgModule({
    imports: [CampFireSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FolderMpmComponent,
        FolderMpmDetailComponent,
        FolderMpmUpdateComponent,
        FolderMpmDeleteDialogComponent,
        FolderMpmDeletePopupComponent
    ],
    entryComponents: [FolderMpmComponent, FolderMpmUpdateComponent, FolderMpmDeleteDialogComponent, FolderMpmDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampFireFolderMpmModule {}
