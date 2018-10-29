/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CampFireTestModule } from '../../../test.module';
import { MoodMpmUpdateComponent } from 'app/entities/mood-mpm/mood-mpm-update.component';
import { MoodMpmService } from 'app/entities/mood-mpm/mood-mpm.service';
import { MoodMpm } from 'app/shared/model/mood-mpm.model';

describe('Component Tests', () => {
    describe('MoodMpm Management Update Component', () => {
        let comp: MoodMpmUpdateComponent;
        let fixture: ComponentFixture<MoodMpmUpdateComponent>;
        let service: MoodMpmService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [MoodMpmUpdateComponent]
            })
                .overrideTemplate(MoodMpmUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MoodMpmUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MoodMpmService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MoodMpm('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mood = entity;
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
                    const entity = new MoodMpm();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mood = entity;
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
