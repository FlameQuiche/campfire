import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { ISprintMpm } from 'app/shared/model/sprint-mpm.model';
import { SprintMpmService } from './sprint-mpm.service';
import { ITeamMpm } from 'app/shared/model/team-mpm.model';
import { TeamMpmService } from 'app/entities/team-mpm';

@Component({
    selector: 'jhi-sprint-mpm-update',
    templateUrl: './sprint-mpm-update.component.html'
})
export class SprintMpmUpdateComponent implements OnInit {
    sprint: ISprintMpm;
    isSaving: boolean;

    teams: ITeamMpm[];
    beginDateDp: any;
    endDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private sprintService: SprintMpmService,
        private teamService: TeamMpmService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sprint }) => {
            this.sprint = sprint;
        });
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
        if (this.sprint.id !== undefined) {
            this.subscribeToSaveResponse(this.sprintService.update(this.sprint));
        } else {
            this.subscribeToSaveResponse(this.sprintService.create(this.sprint));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISprintMpm>>) {
        result.subscribe((res: HttpResponse<ISprintMpm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTeamById(index: number, item: ITeamMpm) {
        return item.id;
    }
}
