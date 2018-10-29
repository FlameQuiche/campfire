import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActionMpm } from 'app/shared/model/action-mpm.model';
import { ActionMpmService } from './action-mpm.service';
import { ActionMpmComponent } from './action-mpm.component';
import { ActionMpmDetailComponent } from './action-mpm-detail.component';
import { ActionMpmUpdateComponent } from './action-mpm-update.component';
import { ActionMpmDeletePopupComponent } from './action-mpm-delete-dialog.component';
import { IActionMpm } from 'app/shared/model/action-mpm.model';

@Injectable({ providedIn: 'root' })
export class ActionMpmResolve implements Resolve<IActionMpm> {
    constructor(private service: ActionMpmService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((action: HttpResponse<ActionMpm>) => action.body));
        }
        return of(new ActionMpm());
    }
}

export const actionRoute: Routes = [
    {
        path: 'action-mpm',
        component: ActionMpmComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'campFireApp.action.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'action-mpm/:id/view',
        component: ActionMpmDetailComponent,
        resolve: {
            action: ActionMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.action.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'action-mpm/new',
        component: ActionMpmUpdateComponent,
        resolve: {
            action: ActionMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.action.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'action-mpm/:id/edit',
        component: ActionMpmUpdateComponent,
        resolve: {
            action: ActionMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.action.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const actionPopupRoute: Routes = [
    {
        path: 'action-mpm/:id/delete',
        component: ActionMpmDeletePopupComponent,
        resolve: {
            action: ActionMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.action.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
