/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CampFireTestModule } from '../../../test.module';
import { ActionMpmUpdateComponent } from 'app/entities/action-mpm/action-mpm-update.component';
import { ActionMpmService } from 'app/entities/action-mpm/action-mpm.service';
import { ActionMpm } from 'app/shared/model/action-mpm.model';

describe('Component Tests', () => {
    describe('ActionMpm Management Update Component', () => {
        let comp: ActionMpmUpdateComponent;
        let fixture: ComponentFixture<ActionMpmUpdateComponent>;
        let service: ActionMpmService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [ActionMpmUpdateComponent]
            })
                .overrideTemplate(ActionMpmUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ActionMpmUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActionMpmService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ActionMpm('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.action = entity;
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
                    const entity = new ActionMpm();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.action = entity;
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
