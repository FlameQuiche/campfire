/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CampFireTestModule } from '../../../test.module';
import { BookmarkMpmDetailComponent } from 'app/entities/bookmark-mpm/bookmark-mpm-detail.component';
import { BookmarkMpm } from 'app/shared/model/bookmark-mpm.model';

describe('Component Tests', () => {
    describe('BookmarkMpm Management Detail Component', () => {
        let comp: BookmarkMpmDetailComponent;
        let fixture: ComponentFixture<BookmarkMpmDetailComponent>;
        const route = ({ data: of({ bookmark: new BookmarkMpm('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [BookmarkMpmDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BookmarkMpmDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BookmarkMpmDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.bookmark).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
