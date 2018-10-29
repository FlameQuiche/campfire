/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CampFireTestModule } from '../../../test.module';
import { FolderMpmDeleteDialogComponent } from 'app/entities/folder-mpm/folder-mpm-delete-dialog.component';
import { FolderMpmService } from 'app/entities/folder-mpm/folder-mpm.service';

describe('Component Tests', () => {
    describe('FolderMpm Management Delete Component', () => {
        let comp: FolderMpmDeleteDialogComponent;
        let fixture: ComponentFixture<FolderMpmDeleteDialogComponent>;
        let service: FolderMpmService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [FolderMpmDeleteDialogComponent]
            })
                .overrideTemplate(FolderMpmDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FolderMpmDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FolderMpmService);
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
