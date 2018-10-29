/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CampFireTestModule } from '../../../test.module';
import { SprintMpmDeleteDialogComponent } from 'app/entities/sprint-mpm/sprint-mpm-delete-dialog.component';
import { SprintMpmService } from 'app/entities/sprint-mpm/sprint-mpm.service';

describe('Component Tests', () => {
    describe('SprintMpm Management Delete Component', () => {
        let comp: SprintMpmDeleteDialogComponent;
        let fixture: ComponentFixture<SprintMpmDeleteDialogComponent>;
        let service: SprintMpmService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [SprintMpmDeleteDialogComponent]
            })
                .overrideTemplate(SprintMpmDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SprintMpmDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SprintMpmService);
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
