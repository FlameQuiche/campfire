import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDetailsMpm } from 'app/shared/model/user-details-mpm.model';
import { UserDetailsMpmService } from './user-details-mpm.service';
import { UserDetailsMpmComponent } from './user-details-mpm.component';
import { UserDetailsMpmDetailComponent } from './user-details-mpm-detail.component';
import { UserDetailsMpmUpdateComponent } from './user-details-mpm-update.component';
import { UserDetailsMpmDeletePopupComponent } from './user-details-mpm-delete-dialog.component';
import { IUserDetailsMpm } from 'app/shared/model/user-details-mpm.model';

@Injectable({ providedIn: 'root' })
export class UserDetailsMpmResolve implements Resolve<IUserDetailsMpm> {
    constructor(private service: UserDetailsMpmService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((userDetails: HttpResponse<UserDetailsMpm>) => userDetails.body));
        }
        return of(new UserDetailsMpm());
    }
}

export const userDetailsRoute: Routes = [
    {
        path: 'user-details-mpm',
        component: UserDetailsMpmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.userDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-details-mpm/:id/view',
        component: UserDetailsMpmDetailComponent,
        resolve: {
            userDetails: UserDetailsMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.userDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-details-mpm/new',
        component: UserDetailsMpmUpdateComponent,
        resolve: {
            userDetails: UserDetailsMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.userDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-details-mpm/:id/edit',
        component: UserDetailsMpmUpdateComponent,
        resolve: {
            userDetails: UserDetailsMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.userDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userDetailsPopupRoute: Routes = [
    {
        path: 'user-details-mpm/:id/delete',
        component: UserDetailsMpmDeletePopupComponent,
        resolve: {
            userDetails: UserDetailsMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.userDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
