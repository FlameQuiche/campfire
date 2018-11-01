/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CampFireTestModule } from '../../../test.module';
import { UserDetailsMpmDeleteDialogComponent } from 'app/entities/user-details-mpm/user-details-mpm-delete-dialog.component';
import { UserDetailsMpmService } from 'app/entities/user-details-mpm/user-details-mpm.service';

describe('Component Tests', () => {
    describe('UserDetailsMpm Management Delete Component', () => {
        let comp: UserDetailsMpmDeleteDialogComponent;
        let fixture: ComponentFixture<UserDetailsMpmDeleteDialogComponent>;
        let service: UserDetailsMpmService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [UserDetailsMpmDeleteDialogComponent]
            })
                .overrideTemplate(UserDetailsMpmDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserDetailsMpmDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserDetailsMpmService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete('123');
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith('123');
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
