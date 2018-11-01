import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IMoodMpm } from 'app/shared/model/mood-mpm.model';
import { MoodMpmService } from './mood-mpm.service';
import { IUserDetailsMpm } from 'app/shared/model/user-details-mpm.model';
import { UserDetailsMpmService } from 'app/entities/user-details-mpm';
import { ISprintMpm } from 'app/shared/model/sprint-mpm.model';
import { SprintMpmService } from 'app/entities/sprint-mpm';

@Component({
    selector: 'jhi-mood-mpm-update',
    templateUrl: './mood-mpm-update.component.html'
})
export class MoodMpmUpdateComponent implements OnInit {
    mood: IMoodMpm;
    isSaving: boolean;

    userdetails: IUserDetailsMpm[];

    sprints: ISprintMpm[];
    dateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private moodService: MoodMpmService,
        private userDetailsService: UserDetailsMpmService,
        private sprintService: SprintMpmService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mood }) => {
            this.mood = mood;
        });
        this.userDetailsService.query().subscribe(
            (res: HttpResponse<IUserDetailsMpm[]>) => {
                this.userdetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.sprintService.query().subscribe(
            (res: HttpResponse<ISprintMpm[]>) => {
                this.sprints = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mood.id !== undefined) {
            this.subscribeToSaveResponse(this.moodService.update(this.mood));
        } else {
            this.subscribeToSaveResponse(this.moodService.create(this.mood));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMoodMpm>>) {
        result.subscribe((res: HttpResponse<IMoodMpm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserDetailsById(index: number, item: IUserDetailsMpm) {
        return item.id;
    }

    trackSprintById(index: number, item: ISprintMpm) {
        return item.id;
    }
}
