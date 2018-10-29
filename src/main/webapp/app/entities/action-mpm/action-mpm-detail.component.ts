import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IActionMpm } from 'app/shared/model/action-mpm.model';

@Component({
    selector: 'jhi-action-mpm-detail',
    templateUrl: './action-mpm-detail.component.html'
})
export class ActionMpmDetailComponent implements OnInit {
    action: IActionMpm;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ action }) => {
            this.action = action;
        });
    }

    previousState() {
        window.history.back();
    }
}
