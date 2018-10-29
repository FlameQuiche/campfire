import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIdeaMpm } from 'app/shared/model/idea-mpm.model';
import { IdeaMpmService } from './idea-mpm.service';

@Component({
    selector: 'jhi-idea-mpm-delete-dialog',
    templateUrl: './idea-mpm-delete-dialog.component.html'
})
export class IdeaMpmDeleteDialogComponent {
    idea: IIdeaMpm;

    constructor(private ideaService: IdeaMpmService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.ideaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ideaListModification',
                content: 'Deleted an idea'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-idea-mpm-delete-popup',
    template: ''
})
export class IdeaMpmDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ idea }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IdeaMpmDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.idea = idea;
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
