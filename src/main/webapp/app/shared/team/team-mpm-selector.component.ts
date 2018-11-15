import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { ITeamMpm } from 'app/shared/model/team-mpm.model';
import { TeamMpmService } from 'app/entities/team-mpm';

@Component({
    selector: 'jhi-team-mpm-selector',
    templateUrl: './team-mpm-selector.component.html',
    styles: [
        '.team-selector-label { font-size: 1.2rem; margin-right: 10px;vertical-align: middle; }' +
            ' .team-selector {width: auto;float: right;margin-right: 10px;}'
    ]
})
export class TeamMpmSelectorComponent implements OnInit {
    teams: ITeamMpm[];
    selectedTeam: string;

    constructor(private teamService: TeamMpmService, private jhiAlertService: JhiAlertService, private eventManager: JhiEventManager) {}

    loadAll() {
        if (this.selectedTeam) {
            this.broadcast();
        }
        this.teamService.query().subscribe(
            (res: HttpResponse<ITeamMpm[]>) => {
                this.teams = res.body;
                if (this.teams && !this.selectedTeam) {
                    this.selectedTeam = this.teams[0].id;
                    this.broadcast();
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
    }

    broadcast() {
        this.eventManager.broadcast({
            name: 'selectedTeamChanged',
            content: this.selectedTeam
        });
    }

    trackTeamById(index: number, item: ITeamMpm) {
        return item.id;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
