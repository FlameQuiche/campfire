import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeamMpm } from 'app/shared/model/team-mpm.model';
import { TeamMpmService } from 'app/entities/team-mpm/team-mpm.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-team-mpm-join',
    templateUrl: './team-mpm-join.component.html'
})
export class TeamMpmJoinComponent implements OnInit {
    team: ITeamMpm;
    isSaving: boolean;
    success: String;

    constructor(private teamService: TeamMpmService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ team }) => {
            this.team = team;
        });
    }

    joinTeam() {
        this.isSaving = true;
        this.teamService
            .join(this.team.id)
            .subscribe((res: HttpResponse<ITeamMpm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.success = 'OK';
    }

    private onSaveError() {
        this.isSaving = false;
        this.success = 'ERROR';
    }
}
