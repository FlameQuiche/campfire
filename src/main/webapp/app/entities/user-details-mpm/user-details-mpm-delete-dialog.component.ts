import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserDetailsMpm } from 'app/shared/model/user-details-mpm.model';
import { UserDetailsMpmService } from './user-details-mpm.service';

@Component({
    selector: 'jhi-user-details-mpm-delete-dialog',
    templateUrl: './user-details-mpm-delete-dialog.component.html'
})
export class UserDetailsMpmDeleteDialogComponent {
    userDetails: IUserDetailsMpm;

    constructor(
        private userDetailsService: UserDetailsMpmService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.userDetailsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userDetailsListModification',
                content: 'Deleted an userDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-details-mpm-delete-popup',
    template: ''
})
export class UserDetailsMpmDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userDetails }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserDetailsMpmDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.userDetails = userDetails;
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
