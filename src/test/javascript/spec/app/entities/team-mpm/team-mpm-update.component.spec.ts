/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CampFireTestModule } from '../../../test.module';
import { TeamMpmUpdateComponent } from 'app/entities/team-mpm/team-mpm-update.component';
import { TeamMpmService } from 'app/entities/team-mpm/team-mpm.service';
import { TeamMpm } from 'app/shared/model/team-mpm.model';

describe('Component Tests', () => {
    describe('TeamMpm Management Update Component', () => {
        let comp: TeamMpmUpdateComponent;
        let fixture: ComponentFixture<TeamMpmUpdateComponent>;
        let service: TeamMpmService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [TeamMpmUpdateComponent]
            })
                .overrideTemplate(TeamMpmUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TeamMpmUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeamMpmService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TeamMpm('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.team = entity;
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
                    const entity = new TeamMpm();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.team = entity;
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
