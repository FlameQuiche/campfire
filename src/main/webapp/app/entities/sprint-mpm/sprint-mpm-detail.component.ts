import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISprintMpm } from 'app/shared/model/sprint-mpm.model';

@Component({
    selector: 'jhi-sprint-mpm-detail',
    templateUrl: './sprint-mpm-detail.component.html'
})
export class SprintMpmDetailComponent implements OnInit {
    sprint: ISprintMpm;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sprint }) => {
            this.sprint = sprint;
        });
    }

    previousState() {
        window.history.back();
    }
}
