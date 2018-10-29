import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IActionMpm } from 'app/shared/model/action-mpm.model';
import { ActionMpmService } from './action-mpm.service';
import { ISprintMpm } from 'app/shared/model/sprint-mpm.model';
import { SprintMpmService } from 'app/entities/sprint-mpm';

@Component({
    selector: 'jhi-action-mpm-update',
    templateUrl: './action-mpm-update.component.html'
})
export class ActionMpmUpdateComponent implements OnInit {
    action: IActionMpm;
    isSaving: boolean;

    sprints: ISprintMpm[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private actionService: ActionMpmService,
        private sprintService: SprintMpmService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ action }) => {
            this.action = action;
        });
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
        if (this.action.id !== undefined) {
            this.subscribeToSaveResponse(this.actionService.update(this.action));
        } else {
            this.subscribeToSaveResponse(this.actionService.create(this.action));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IActionMpm>>) {
        result.subscribe((res: HttpResponse<IActionMpm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSprintById(index: number, item: ISprintMpm) {
        return item.id;
    }
}
