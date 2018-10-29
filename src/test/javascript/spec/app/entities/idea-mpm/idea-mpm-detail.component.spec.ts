/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CampFireTestModule } from '../../../test.module';
import { IdeaMpmDetailComponent } from 'app/entities/idea-mpm/idea-mpm-detail.component';
import { IdeaMpm } from 'app/shared/model/idea-mpm.model';

describe('Component Tests', () => {
    describe('IdeaMpm Management Detail Component', () => {
        let comp: IdeaMpmDetailComponent;
        let fixture: ComponentFixture<IdeaMpmDetailComponent>;
        const route = ({ data: of({ idea: new IdeaMpm('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [IdeaMpmDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IdeaMpmDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IdeaMpmDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.idea).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
