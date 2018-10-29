/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CampFireTestModule } from '../../../test.module';
import { TeamMpmDetailComponent } from 'app/entities/team-mpm/team-mpm-detail.component';
import { TeamMpm } from 'app/shared/model/team-mpm.model';

describe('Component Tests', () => {
    describe('TeamMpm Management Detail Component', () => {
        let comp: TeamMpmDetailComponent;
        let fixture: ComponentFixture<TeamMpmDetailComponent>;
        const route = ({ data: of({ team: new TeamMpm('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [TeamMpmDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TeamMpmDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TeamMpmDetailComponent);
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
