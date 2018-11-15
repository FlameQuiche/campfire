import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CampFireSharedModule } from 'app/shared';
import {
    BookmarkMpmComponent,
    BookmarkMpmDeleteDialogComponent,
    BookmarkMpmDeletePopupComponent,
    BookmarkMpmDetailComponent,
    BookmarkMpmUpdateComponent,
    bookmarkPopupRoute,
    bookmarkRoute
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
