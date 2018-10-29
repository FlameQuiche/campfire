import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBookmarkMpm } from 'app/shared/model/bookmark-mpm.model';
import { BookmarkMpmService } from './bookmark-mpm.service';
import { IFolderMpm } from 'app/shared/model/folder-mpm.model';
import { FolderMpmService } from 'app/entities/folder-mpm';

@Component({
    selector: 'jhi-bookmark-mpm-update',
    templateUrl: './bookmark-mpm-update.component.html'
})
export class BookmarkMpmUpdateComponent implements OnInit {
    bookmark: IBookmarkMpm;
    isSaving: boolean;

    folders: IFolderMpm[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private bookmarkService: BookmarkMpmService,
        private folderService: FolderMpmService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bookmark }) => {
            this.bookmark = bookmark;
        });
        this.folderService.query().subscribe(
            (res: HttpResponse<IFolderMpm[]>) => {
                this.folders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.bookmark.id !== undefined) {
            this.subscribeToSaveResponse(this.bookmarkService.update(this.bookmark));
        } else {
            this.subscribeToSaveResponse(this.bookmarkService.create(this.bookmark));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBookmarkMpm>>) {
        result.subscribe((res: HttpResponse<IBookmarkMpm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackFolderById(index: number, item: IFolderMpm) {
        return item.id;
    }
}
