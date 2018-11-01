import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUserDetailsMpm } from 'app/shared/model/user-details-mpm.model';
import { UserDetailsMpmService } from './user-details-mpm.service';
import { IUser, UserService } from 'app/core';
import { ITeamMpm } from 'app/shared/model/team-mpm.model';
import { TeamMpmService } from 'app/entities/team-mpm';

@Component({
    selector: 'jhi-user-details-mpm-update',
    templateUrl: './user-details-mpm-update.component.html'
})
export class UserDetailsMpmUpdateComponent implements OnInit {
    userDetails: IUserDetailsMpm;
    isSaving: boolean;

    users: IUser[];

    teams: ITeamMpm[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private userDetailsService: UserDetailsMpmService,
        private userService: UserService,
        private teamService: TeamMpmService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userDetails }) => {
            this.userDetails = userDetails;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.teamService.query().subscribe(
            (res: HttpResponse<ITeamMpm[]>) => {
                this.teams = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.userDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.userDetailsService.update(this.userDetails));
        } else {
            this.subscribeToSaveResponse(this.userDetailsService.create(this.userDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUserDetailsMpm>>) {
        result.subscribe((res: HttpResponse<IUserDetailsMpm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackTeamById(index: number, item: ITeamMpm) {
        return item.id;
    }
}
