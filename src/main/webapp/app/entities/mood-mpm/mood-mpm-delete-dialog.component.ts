import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMoodMpm } from 'app/shared/model/mood-mpm.model';
import { MoodMpmService } from './mood-mpm.service';

@Component({
    selector: 'jhi-mood-mpm-delete-dialog',
    templateUrl: './mood-mpm-delete-dialog.component.html'
})
export class MoodMpmDeleteDialogComponent {
    mood: IMoodMpm;

    constructor(private moodService: MoodMpmService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.moodService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'moodListModification',
                content: 'Deleted an mood'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mood-mpm-delete-popup',
    template: ''
})
export class MoodMpmDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mood }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MoodMpmDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.mood = mood;
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
