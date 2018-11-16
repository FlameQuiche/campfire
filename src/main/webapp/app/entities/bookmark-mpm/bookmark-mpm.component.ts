import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IBookmarkMpm } from 'app/shared/model/bookmark-mpm.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { BookmarkMpmService } from './bookmark-mpm.service';
import { TeamMpmService } from 'app/entities/team-mpm';

@Component({
    selector: 'jhi-bookmark-mpm',
    templateUrl: './bookmark-mpm.component.html'
})
export class BookmarkMpmComponent implements OnInit, OnDestroy {
    currentAccount: any;
    bookmarks: IBookmarkMpm[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private bookmarkService: BookmarkMpmService,
        private teamService: TeamMpmService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll(selectedTeam) {
        this.bookmarkService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort(),
                team: selectedTeam
            })
            .subscribe(
                (res: HttpResponse<IBookmarkMpm[]>) => this.paginateBookmarks(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/bookmark-mpm'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll(null);
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/bookmark-mpm',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll(null);
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBookmarks();
        this.registerChangeTeam();
        this.loadAll(null);
    }

    registerChangeTeam() {
        this.eventManager.subscribe('selectedTeamChanged', res => {
            this.loadAll(res.content);
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBookmarkMpm) {
        return item.id;
    }

    registerChangeInBookmarks() {
        this.eventSubscriber = this.eventManager.subscribe('bookmarkListModification', response => this.loadAll(null));
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateBookmarks(data: IBookmarkMpm[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.bookmarks = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
