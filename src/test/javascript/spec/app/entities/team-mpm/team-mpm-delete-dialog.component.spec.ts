/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CampFireTestModule } from '../../../test.module';
import { TeamMpmDeleteDialogComponent } from 'app/entities/team-mpm/team-mpm-delete-dialog.component';
import { TeamMpmService } from 'app/entities/team-mpm/team-mpm.service';

describe('Component Tests', () => {
    describe('TeamMpm Management Delete Component', () => {
        let comp: TeamMpmDeleteDialogComponent;
        let fixture: ComponentFixture<TeamMpmDeleteDialogComponent>;
        let service: TeamMpmService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [TeamMpmDeleteDialogComponent]
            })
                .overrideTemplate(TeamMpmDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TeamMpmDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeamMpmService);
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
