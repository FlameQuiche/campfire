/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CampFireTestModule } from '../../../test.module';
import { MoodMpmDeleteDialogComponent } from 'app/entities/mood-mpm/mood-mpm-delete-dialog.component';
import { MoodMpmService } from 'app/entities/mood-mpm/mood-mpm.service';

describe('Component Tests', () => {
    describe('MoodMpm Management Delete Component', () => {
        let comp: MoodMpmDeleteDialogComponent;
        let fixture: ComponentFixture<MoodMpmDeleteDialogComponent>;
        let service: MoodMpmService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [MoodMpmDeleteDialogComponent]
            })
                .overrideTemplate(MoodMpmDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MoodMpmDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MoodMpmService);
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
