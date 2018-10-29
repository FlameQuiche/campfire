import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMoodMpm } from 'app/shared/model/mood-mpm.model';
import { Principal } from 'app/core';
import { MoodMpmService } from './mood-mpm.service';

@Component({
    selector: 'jhi-mood-mpm',
    templateUrl: './mood-mpm.component.html'
})
export class MoodMpmComponent implements OnInit, OnDestroy {
    moods: IMoodMpm[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private moodService: MoodMpmService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.moodService.query().subscribe(
            (res: HttpResponse<IMoodMpm[]>) => {
                this.moods = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMoods();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMoodMpm) {
        return item.id;
    }

    registerChangeInMoods() {
        this.eventSubscriber = this.eventManager.subscribe('moodListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
