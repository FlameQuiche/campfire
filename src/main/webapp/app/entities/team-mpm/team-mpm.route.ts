import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamMpm } from 'app/shared/model/team-mpm.model';
import { TeamMpmService } from './team-mpm.service';
import { TeamMpmComponent } from './team-mpm.component';
import { TeamMpmDetailComponent } from './team-mpm-detail.component';
import { TeamMpmUpdateComponent } from './team-mpm-update.component';
import { TeamMpmDeletePopupComponent } from './team-mpm-delete-dialog.component';
import { TeamMpmJoinComponent } from './team-mpm-join.component';
import { ITeamMpm } from 'app/shared/model/team-mpm.model';

@Injectable({ providedIn: 'root' })
export class TeamMpmResolve implements Resolve<ITeamMpm> {
    constructor(private service: TeamMpmService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((team: HttpResponse<TeamMpm>) => team.body));
        }
        return of(new TeamMpm());
    }
}

export const teamRoute: Routes = [
    {
        path: 'team-mpm',
        component: TeamMpmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.team.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'team-mpm/:id/view',
        component: TeamMpmDetailComponent,
        resolve: {
            team: TeamMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.team.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'team-mpm/new',
        component: TeamMpmUpdateComponent,
        resolve: {
            team: TeamMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.team.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'team-mpm/:id/edit',
        component: TeamMpmUpdateComponent,
        resolve: {
            team: TeamMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.team.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'team-mpm/:id/join',
        component: TeamMpmJoinComponent,
        resolve: {
            team: TeamMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.team.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teamPopupRoute: Routes = [
    {
        path: 'team-mpm/:id/delete',
        component: TeamMpmDeletePopupComponent,
        resolve: {
            team: TeamMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.team.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
