import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdeaMpm } from 'app/shared/model/idea-mpm.model';
import { IdeaMpmService } from './idea-mpm.service';
import { IdeaMpmComponent } from './idea-mpm.component';
import { IdeaMpmDetailComponent } from './idea-mpm-detail.component';
import { IdeaMpmUpdateComponent } from './idea-mpm-update.component';
import { IdeaMpmDeletePopupComponent } from './idea-mpm-delete-dialog.component';
import { IIdeaMpm } from 'app/shared/model/idea-mpm.model';

@Injectable({ providedIn: 'root' })
export class IdeaMpmResolve implements Resolve<IIdeaMpm> {
    constructor(private service: IdeaMpmService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((idea: HttpResponse<IdeaMpm>) => idea.body));
        }
        return of(new IdeaMpm());
    }
}

export const ideaRoute: Routes = [
    {
        path: 'idea-mpm',
        component: IdeaMpmComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'campFireApp.idea.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'idea-mpm/:id/view',
        component: IdeaMpmDetailComponent,
        resolve: {
            idea: IdeaMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.idea.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'idea-mpm/new',
        component: IdeaMpmUpdateComponent,
        resolve: {
            idea: IdeaMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.idea.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'idea-mpm/:id/edit',
        component: IdeaMpmUpdateComponent,
        resolve: {
            idea: IdeaMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.idea.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ideaPopupRoute: Routes = [
    {
        path: 'idea-mpm/:id/delete',
        component: IdeaMpmDeletePopupComponent,
        resolve: {
            idea: IdeaMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.idea.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
