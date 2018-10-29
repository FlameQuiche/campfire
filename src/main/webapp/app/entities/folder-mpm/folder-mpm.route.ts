import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FolderMpm } from 'app/shared/model/folder-mpm.model';
import { FolderMpmService } from './folder-mpm.service';
import { FolderMpmComponent } from './folder-mpm.component';
import { FolderMpmDetailComponent } from './folder-mpm-detail.component';
import { FolderMpmUpdateComponent } from './folder-mpm-update.component';
import { FolderMpmDeletePopupComponent } from './folder-mpm-delete-dialog.component';
import { IFolderMpm } from 'app/shared/model/folder-mpm.model';

@Injectable({ providedIn: 'root' })
export class FolderMpmResolve implements Resolve<IFolderMpm> {
    constructor(private service: FolderMpmService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((folder: HttpResponse<FolderMpm>) => folder.body));
        }
        return of(new FolderMpm());
    }
}

export const folderRoute: Routes = [
    {
        path: 'folder-mpm',
        component: FolderMpmComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'campFireApp.folder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'folder-mpm/:id/view',
        component: FolderMpmDetailComponent,
        resolve: {
            folder: FolderMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.folder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'folder-mpm/new',
        component: FolderMpmUpdateComponent,
        resolve: {
            folder: FolderMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.folder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'folder-mpm/:id/edit',
        component: FolderMpmUpdateComponent,
        resolve: {
            folder: FolderMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.folder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const folderPopupRoute: Routes = [
    {
        path: 'folder-mpm/:id/delete',
        component: FolderMpmDeletePopupComponent,
        resolve: {
            folder: FolderMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.folder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
