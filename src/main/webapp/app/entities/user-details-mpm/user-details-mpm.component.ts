import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserDetailsMpm } from 'app/shared/model/user-details-mpm.model';
import { Principal } from 'app/core';
import { UserDetailsMpmService } from './user-details-mpm.service';

@Component({
    selector: 'jhi-user-details-mpm',
    templateUrl: './user-details-mpm.component.html'
})
export class UserDetailsMpmComponent implements OnInit, OnDestroy {
    userDetails: IUserDetailsMpm[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userDetailsService: UserDetailsMpmService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.userDetailsService.query().subscribe(
            (res: HttpResponse<IUserDetailsMpm[]>) => {
                this.userDetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUserDetails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUserDetailsMpm) {
        return item.id;
    }

    registerChangeInUserDetails() {
        this.eventSubscriber = this.eventManager.subscribe('userDetailsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
