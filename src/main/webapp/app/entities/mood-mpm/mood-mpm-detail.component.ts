import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMoodMpm } from 'app/shared/model/mood-mpm.model';

@Component({
    selector: 'jhi-mood-mpm-detail',
    templateUrl: './mood-mpm-detail.component.html'
})
export class MoodMpmDetailComponent implements OnInit {
    mood: IMoodMpm;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mood }) => {
            this.mood = mood;
        });
    }

    previousState() {
        window.history.back();
    }
}
