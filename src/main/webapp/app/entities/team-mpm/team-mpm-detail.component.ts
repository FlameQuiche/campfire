import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeamMpm } from 'app/shared/model/team-mpm.model';

@Component({
    selector: 'jhi-team-mpm-detail',
    templateUrl: './team-mpm-detail.component.html'
})
export class TeamMpmDetailComponent implements OnInit {
    team: ITeamMpm;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ team }) => {
            this.team = team;
        });
    }

    previousState() {
        window.history.back();
    }
}
