import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIdeaMpm } from 'app/shared/model/idea-mpm.model';

@Component({
    selector: 'jhi-idea-mpm-detail',
    templateUrl: './idea-mpm-detail.component.html'
})
export class IdeaMpmDetailComponent implements OnInit {
    idea: IIdeaMpm;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ idea }) => {
            this.idea = idea;
        });
    }

    previousState() {
        window.history.back();
    }
}
