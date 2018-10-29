import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITeamMpm } from 'app/shared/model/team-mpm.model';
import { Principal } from 'app/core';
import { TeamMpmService } from './team-mpm.service';

@Component({
    selector: 'jhi-team-mpm',
    templateUrl: './team-mpm.component.html'
})
export class TeamMpmComponent implements OnInit, OnDestroy {
    teams: ITeamMpm[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private teamService: TeamMpmService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.teamService.query().subscribe(
            (res: HttpResponse<ITeamMpm[]>) => {
                this.teams = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTeams();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITeamMpm) {
        return item.id;
    }

    registerChangeInTeams() {
        this.eventSubscriber = this.eventManager.subscribe('teamListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
