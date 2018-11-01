/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CampFireTestModule } from '../../../test.module';
import { TeamMpmJoinComponent } from 'app/entities/team-mpm/team-mpm-join.component';
import { TeamMpm } from 'app/shared/model/team-mpm.model';

describe('Component Tests', () => {
    describe('TeamMpm Management Join Component', () => {
        let comp: TeamMpmJoinComponent;
        let fixture: ComponentFixture<TeamMpmJoinComponent>;
        const route = ({ data: of({ team: new TeamMpm('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [TeamMpmJoinComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TeamMpmJoinComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TeamMpmJoinComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.team).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
