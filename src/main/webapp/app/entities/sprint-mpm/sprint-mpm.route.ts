import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SprintMpm } from 'app/shared/model/sprint-mpm.model';
import { SprintMpmService } from './sprint-mpm.service';
import { SprintMpmComponent } from './sprint-mpm.component';
import { SprintMpmDetailComponent } from './sprint-mpm-detail.component';
import { SprintMpmUpdateComponent } from './sprint-mpm-update.component';
import { SprintMpmDeletePopupComponent } from './sprint-mpm-delete-dialog.component';
import { ISprintMpm } from 'app/shared/model/sprint-mpm.model';

@Injectable({ providedIn: 'root' })
export class SprintMpmResolve implements Resolve<ISprintMpm> {
    constructor(private service: SprintMpmService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((sprint: HttpResponse<SprintMpm>) => sprint.body));
        }
        return of(new SprintMpm());
    }
}

export const sprintRoute: Routes = [
    {
        path: 'sprint-mpm',
        component: SprintMpmComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'campFireApp.sprint.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sprint-mpm/:id/view',
        component: SprintMpmDetailComponent,
        resolve: {
            sprint: SprintMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.sprint.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sprint-mpm/new',
        component: SprintMpmUpdateComponent,
        resolve: {
            sprint: SprintMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.sprint.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sprint-mpm/:id/edit',
        component: SprintMpmUpdateComponent,
        resolve: {
            sprint: SprintMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.sprint.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sprintPopupRoute: Routes = [
    {
        path: 'sprint-mpm/:id/delete',
        component: SprintMpmDeletePopupComponent,
        resolve: {
            sprint: SprintMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.sprint.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
