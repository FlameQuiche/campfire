import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CampFireSharedModule } from 'app/shared';
import {
    BookmarkMpmComponent,
    BookmarkMpmDetailComponent,
    BookmarkMpmUpdateComponent,
    BookmarkMpmDeletePopupComponent,
    BookmarkMpmDeleteDialogComponent,
    bookmarkRoute,
    bookmarkPopupRoute
} from './';

const ENTITY_STATES = [...bookmarkRoute, ...bookmarkPopupRoute];

@NgModule({
    imports: [CampFireSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BookmarkMpmComponent,
        BookmarkMpmDetailComponent,
        BookmarkMpmUpdateComponent,
        BookmarkMpmDeleteDialogComponent,
        BookmarkMpmDeletePopupComponent
    ],
    entryComponents: [BookmarkMpmComponent, BookmarkMpmUpdateComponent, BookmarkMpmDeleteDialogComponent, BookmarkMpmDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampFireBookmarkMpmModule {}
