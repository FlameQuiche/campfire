import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBookmarkMpm } from 'app/shared/model/bookmark-mpm.model';
import { BookmarkMpmService } from './bookmark-mpm.service';
import { ITeamMpm } from 'app/shared/model/team-mpm.model';
import { TeamMpmService } from 'app/entities/team-mpm';

@Component({
    selector: 'jhi-bookmark-mpm-update',
    templateUrl: './bookmark-mpm-update.component.html'
})
export class BookmarkMpmUpdateComponent implements OnInit {
    bookmark: IBookmarkMpm;
    isSaving: boolean;

    teams: ITeamMpm[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private bookmarkService: BookmarkMpmService,
        private teamService: TeamMpmService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bookmark }) => {
            if (bookmark.tags) {
                bookmark.tags = bookmark.tags.join(',');
            }
            this.bookmark = bookmark;
        });
        this.teamService.query().subscribe(
            (res: HttpResponse<ITeamMpm[]>) => {
                this.teams = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.bookmark.tags) {
            this.bookmark.tags = this.bookmark.tags.split(',');
            this.bookmark.tags.forEach(t => t.trim());
        }
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

    trackTeamById(index: number, item: ITeamMpm) {
        return item.id;
    }
}
