/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CampFireTestModule } from '../../../test.module';
import { BookmarkMpmDeleteDialogComponent } from 'app/entities/bookmark-mpm/bookmark-mpm-delete-dialog.component';
import { BookmarkMpmService } from 'app/entities/bookmark-mpm/bookmark-mpm.service';

describe('Component Tests', () => {
    describe('BookmarkMpm Management Delete Component', () => {
        let comp: BookmarkMpmDeleteDialogComponent;
        let fixture: ComponentFixture<BookmarkMpmDeleteDialogComponent>;
        let service: BookmarkMpmService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [BookmarkMpmDeleteDialogComponent]
            })
                .overrideTemplate(BookmarkMpmDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BookmarkMpmDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookmarkMpmService);
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
