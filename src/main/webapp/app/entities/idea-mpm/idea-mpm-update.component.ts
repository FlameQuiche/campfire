import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IIdeaMpm } from 'app/shared/model/idea-mpm.model';
import { IdeaMpmService } from './idea-mpm.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-idea-mpm-update',
    templateUrl: './idea-mpm-update.component.html'
})
export class IdeaMpmUpdateComponent implements OnInit {
    idea: IIdeaMpm;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private ideaService: IdeaMpmService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ idea }) => {
            this.idea = idea;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.idea.id !== undefined) {
            this.subscribeToSaveResponse(this.ideaService.update(this.idea));
        } else {
            this.subscribeToSaveResponse(this.ideaService.create(this.idea));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IIdeaMpm>>) {
        result.subscribe((res: HttpResponse<IIdeaMpm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
