/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CampFireTestModule } from '../../../test.module';
import { MoodMpmDetailComponent } from 'app/entities/mood-mpm/mood-mpm-detail.component';
import { MoodMpm } from 'app/shared/model/mood-mpm.model';

describe('Component Tests', () => {
    describe('MoodMpm Management Detail Component', () => {
        let comp: MoodMpmDetailComponent;
        let fixture: ComponentFixture<MoodMpmDetailComponent>;
        const route = ({ data: of({ mood: new MoodMpm('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [MoodMpmDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MoodMpmDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MoodMpmDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mood).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
