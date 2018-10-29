import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBookmarkMpm } from 'app/shared/model/bookmark-mpm.model';

@Component({
    selector: 'jhi-bookmark-mpm-detail',
    templateUrl: './bookmark-mpm-detail.component.html'
})
export class BookmarkMpmDetailComponent implements OnInit {
    bookmark: IBookmarkMpm;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bookmark }) => {
            this.bookmark = bookmark;
        });
    }

    previousState() {
        window.history.back();
    }
}
