/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CampFireTestModule } from '../../../test.module';
import { SprintMpmDetailComponent } from 'app/entities/sprint-mpm/sprint-mpm-detail.component';
import { SprintMpm } from 'app/shared/model/sprint-mpm.model';

describe('Component Tests', () => {
    describe('SprintMpm Management Detail Component', () => {
        let comp: SprintMpmDetailComponent;
        let fixture: ComponentFixture<SprintMpmDetailComponent>;
        const route = ({ data: of({ sprint: new SprintMpm('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [SprintMpmDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SprintMpmDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SprintMpmDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sprint).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
