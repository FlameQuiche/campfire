/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CampFireTestModule } from '../../../test.module';
import { SprintMpmUpdateComponent } from 'app/entities/sprint-mpm/sprint-mpm-update.component';
import { SprintMpmService } from 'app/entities/sprint-mpm/sprint-mpm.service';
import { SprintMpm } from 'app/shared/model/sprint-mpm.model';

describe('Component Tests', () => {
    describe('SprintMpm Management Update Component', () => {
        let comp: SprintMpmUpdateComponent;
        let fixture: ComponentFixture<SprintMpmUpdateComponent>;
        let service: SprintMpmService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [SprintMpmUpdateComponent]
            })
                .overrideTemplate(SprintMpmUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SprintMpmUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SprintMpmService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SprintMpm('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sprint = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SprintMpm();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sprint = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
