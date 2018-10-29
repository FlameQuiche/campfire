/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CampFireTestModule } from '../../../test.module';
import { ActionMpmDetailComponent } from 'app/entities/action-mpm/action-mpm-detail.component';
import { ActionMpm } from 'app/shared/model/action-mpm.model';

describe('Component Tests', () => {
    describe('ActionMpm Management Detail Component', () => {
        let comp: ActionMpmDetailComponent;
        let fixture: ComponentFixture<ActionMpmDetailComponent>;
        const route = ({ data: of({ action: new ActionMpm('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [ActionMpmDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ActionMpmDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ActionMpmDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.action).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
