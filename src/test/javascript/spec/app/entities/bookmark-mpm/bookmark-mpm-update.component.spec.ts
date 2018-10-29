/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CampFireTestModule } from '../../../test.module';
import { BookmarkMpmUpdateComponent } from 'app/entities/bookmark-mpm/bookmark-mpm-update.component';
import { BookmarkMpmService } from 'app/entities/bookmark-mpm/bookmark-mpm.service';
import { BookmarkMpm } from 'app/shared/model/bookmark-mpm.model';

describe('Component Tests', () => {
    describe('BookmarkMpm Management Update Component', () => {
        let comp: BookmarkMpmUpdateComponent;
        let fixture: ComponentFixture<BookmarkMpmUpdateComponent>;
        let service: BookmarkMpmService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [BookmarkMpmUpdateComponent]
            })
                .overrideTemplate(BookmarkMpmUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BookmarkMpmUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookmarkMpmService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BookmarkMpm('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bookmark = entity;
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
                    const entity = new BookmarkMpm();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bookmark = entity;
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
