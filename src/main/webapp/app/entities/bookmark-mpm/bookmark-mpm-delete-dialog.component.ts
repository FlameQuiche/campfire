import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBookmarkMpm } from 'app/shared/model/bookmark-mpm.model';
import { BookmarkMpmService } from './bookmark-mpm.service';

@Component({
    selector: 'jhi-bookmark-mpm-delete-dialog',
    templateUrl: './bookmark-mpm-delete-dialog.component.html'
})
export class BookmarkMpmDeleteDialogComponent {
    bookmark: IBookmarkMpm;

    constructor(private bookmarkService: BookmarkMpmService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.bookmarkService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'bookmarkListModification',
                content: 'Deleted an bookmark'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bookmark-mpm-delete-popup',
    template: ''
})
export class BookmarkMpmDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bookmark }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BookmarkMpmDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.bookmark = bookmark;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
