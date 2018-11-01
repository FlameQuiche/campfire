import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserDetailsMpm } from 'app/shared/model/user-details-mpm.model';

@Component({
    selector: 'jhi-user-details-mpm-detail',
    templateUrl: './user-details-mpm-detail.component.html'
})
export class UserDetailsMpmDetailComponent implements OnInit {
    userDetails: IUserDetailsMpm;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userDetails }) => {
            this.userDetails = userDetails;
        });
    }

    previousState() {
        window.history.back();
    }
}
