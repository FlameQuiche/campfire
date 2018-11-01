import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeamMpm } from 'app/shared/model/team-mpm.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TeamMpmService } from 'app/entities/team-mpm/team-mpm.service';

@Component({
    selector: 'jhi-team-mpm-detail',
    templateUrl: './team-mpm-detail.component.html'
})
export class TeamMpmDetailComponent implements OnInit {
    team: ITeamMpm;
    newMemberEmail: String;
    isSending: boolean;
    success: String;

    constructor(private teamService: TeamMpmService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ team }) => {
            this.team = team;
        });
        this.newMemberEmail = '';
    }

    previousState() {
        window.history.back();
    }

    sendInvitation() {
        this.isSending = true;
        this.teamService
            .invite(this.team.id, this.newMemberEmail)
            .subscribe((res: HttpResponse<ITeamMpm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.newMemberEmail = '';
        this.isSending = false;
        this.success = 'OK';
    }

    private onSaveError() {
        this.isSending = false;
        this.success = 'ERROR';
    }
}
