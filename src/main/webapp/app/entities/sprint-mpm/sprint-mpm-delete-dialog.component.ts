import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISprintMpm } from 'app/shared/model/sprint-mpm.model';
import { SprintMpmService } from './sprint-mpm.service';

@Component({
    selector: 'jhi-sprint-mpm-delete-dialog',
    templateUrl: './sprint-mpm-delete-dialog.component.html'
})
export class SprintMpmDeleteDialogComponent {
    sprint: ISprintMpm;

    constructor(private sprintService: SprintMpmService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.sprintService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sprintListModification',
                content: 'Deleted an sprint'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sprint-mpm-delete-popup',
    template: ''
})
export class SprintMpmDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sprint }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SprintMpmDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.sprint = sprint;
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
