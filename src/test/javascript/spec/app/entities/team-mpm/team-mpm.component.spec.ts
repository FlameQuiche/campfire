/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CampFireTestModule } from '../../../test.module';
import { TeamMpmComponent } from 'app/entities/team-mpm/team-mpm.component';
import { TeamMpmService } from 'app/entities/team-mpm/team-mpm.service';
import { TeamMpm } from 'app/shared/model/team-mpm.model';

describe('Component Tests', () => {
    describe('TeamMpm Management Component', () => {
        let comp: TeamMpmComponent;
        let fixture: ComponentFixture<TeamMpmComponent>;
        let service: TeamMpmService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [TeamMpmComponent],
                providers: []
            })
                .overrideTemplate(TeamMpmComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TeamMpmComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeamMpmService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TeamMpm('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.teams[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
