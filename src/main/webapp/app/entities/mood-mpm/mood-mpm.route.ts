import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MoodMpm } from 'app/shared/model/mood-mpm.model';
import { MoodMpmService } from './mood-mpm.service';
import { MoodMpmComponent } from './mood-mpm.component';
import { MoodMpmDetailComponent } from './mood-mpm-detail.component';
import { MoodMpmUpdateComponent } from './mood-mpm-update.component';
import { MoodMpmDeletePopupComponent } from './mood-mpm-delete-dialog.component';
import { IMoodMpm } from 'app/shared/model/mood-mpm.model';

@Injectable({ providedIn: 'root' })
export class MoodMpmResolve implements Resolve<IMoodMpm> {
    constructor(private service: MoodMpmService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((mood: HttpResponse<MoodMpm>) => mood.body));
        }
        return of(new MoodMpm());
    }
}

export const moodRoute: Routes = [
    {
        path: 'mood-mpm',
        component: MoodMpmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.mood.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mood-mpm/:id/view',
        component: MoodMpmDetailComponent,
        resolve: {
            mood: MoodMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.mood.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mood-mpm/new',
        component: MoodMpmUpdateComponent,
        resolve: {
            mood: MoodMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.mood.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mood-mpm/:id/edit',
        component: MoodMpmUpdateComponent,
        resolve: {
            mood: MoodMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.mood.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const moodPopupRoute: Routes = [
    {
        path: 'mood-mpm/:id/delete',
        component: MoodMpmDeletePopupComponent,
        resolve: {
            mood: MoodMpmResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'campFireApp.mood.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
