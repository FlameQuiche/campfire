import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookmarkMpm } from 'app/shared/model/bookmark-mpm.model';
import { BookmarkMpmService } from './bookmark-mpm.service';
import { BookmarkMpmComponent } from './bookmark-mpm.component';
import { BookmarkMpmDetailComponent } from './bookmark-mpm-detail.component';
import { BookmarkMpmUpdateComponent } from './bookmark-mpm-update.component';
import { BookmarkMpmDeletePopupComponent } from './bookmark-mpm-delete-dialog.component';
import { IBookmarkMpm } from 'app/shared/model/bookmark-mpm.model';

@Injectable({ providedIn: 'root' })
export class BookmarkMpmResolve implements Resolve<IBookmarkMpm> {
    constructor(private service: BookmarkMpmService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((bookmark: HttpResponse<BookmarkMpm>) => bookmark.body));
        }
        return of(new BookmarkMpm());
    }
}

export const bookmarkRoute: Routes = [
    {
        path: 'bookmark-mpm',
        component: BookmarkMpmComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'campFireApp.bookmark.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bookmark-mpm/:id/view',
        component: BookmarkMpmDetailComponent,
        resolve: {
            bookmark: BookmarkMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.bookmark.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bookmark-mpm/new',
        component: BookmarkMpmUpdateComponent,
        resolve: {
            bookmark: BookmarkMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.bookmark.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bookmark-mpm/:id/edit',
        component: BookmarkMpmUpdateComponent,
        resolve: {
            bookmark: BookmarkMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.bookmark.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bookmarkPopupRoute: Routes = [
    {
        path: 'bookmark-mpm/:id/delete',
        component: BookmarkMpmDeletePopupComponent,
        resolve: {
            bookmark: BookmarkMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.bookmark.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
