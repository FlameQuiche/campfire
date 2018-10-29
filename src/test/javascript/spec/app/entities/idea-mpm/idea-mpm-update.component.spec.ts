/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CampFireTestModule } from '../../../test.module';
import { IdeaMpmUpdateComponent } from 'app/entities/idea-mpm/idea-mpm-update.component';
import { IdeaMpmService } from 'app/entities/idea-mpm/idea-mpm.service';
import { IdeaMpm } from 'app/shared/model/idea-mpm.model';

describe('Component Tests', () => {
    describe('IdeaMpm Management Update Component', () => {
        let comp: IdeaMpmUpdateComponent;
        let fixture: ComponentFixture<IdeaMpmUpdateComponent>;
        let service: IdeaMpmService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [IdeaMpmUpdateComponent]
            })
                .overrideTemplate(IdeaMpmUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IdeaMpmUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IdeaMpmService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new IdeaMpm('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.idea = entity;
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
                    const entity = new IdeaMpm();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.idea = entity;
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
