import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFolderMpm } from 'app/shared/model/folder-mpm.model';

@Component({
    selector: 'jhi-folder-mpm-detail',
    templateUrl: './folder-mpm-detail.component.html'
})
export class FolderMpmDetailComponent implements OnInit {
    folder: IFolderMpm;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ folder }) => {
            this.folder = folder;
        });
    }

    previousState() {
        window.history.back();
    }
}
