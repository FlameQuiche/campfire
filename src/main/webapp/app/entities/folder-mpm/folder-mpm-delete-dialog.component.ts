import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFolderMpm } from 'app/shared/model/folder-mpm.model';
import { FolderMpmService } from './folder-mpm.service';

@Component({
    selector: 'jhi-folder-mpm-delete-dialog',
    templateUrl: './folder-mpm-delete-dialog.component.html'
})
export class FolderMpmDeleteDialogComponent {
    folder: IFolderMpm;

    constructor(private folderService: FolderMpmService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.folderService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'folderListModification',
                content: 'Deleted an folder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-folder-mpm-delete-popup',
    template: ''
})
export class FolderMpmDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ folder }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FolderMpmDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.folder = folder;
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
