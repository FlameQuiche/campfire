import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITeamMpm } from 'app/shared/model/team-mpm.model';
import { TeamMpmService } from './team-mpm.service';

@Component({
    selector: 'jhi-team-mpm-update',
    templateUrl: './team-mpm-update.component.html'
})
export class TeamMpmUpdateComponent implements OnInit {
    team: ITeamMpm;
    isSaving: boolean;

    constructor(private teamService: TeamMpmService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ team }) => {
            this.team = team;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.team.id !== undefined) {
            this.subscribeToSaveResponse(this.teamService.update(this.team));
        } else {
            this.subscribeToSaveResponse(this.teamService.create(this.team));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITeamMpm>>) {
        result.subscribe((res: HttpResponse<ITeamMpm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
