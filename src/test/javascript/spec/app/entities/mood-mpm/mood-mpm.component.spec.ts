/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CampFireTestModule } from '../../../test.module';
import { MoodMpmComponent } from 'app/entities/mood-mpm/mood-mpm.component';
import { MoodMpmService } from 'app/entities/mood-mpm/mood-mpm.service';
import { MoodMpm } from 'app/shared/model/mood-mpm.model';

describe('Component Tests', () => {
    describe('MoodMpm Management Component', () => {
        let comp: MoodMpmComponent;
        let fixture: ComponentFixture<MoodMpmComponent>;
        let service: MoodMpmService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [MoodMpmComponent],
                providers: []
            })
                .overrideTemplate(MoodMpmComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MoodMpmComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MoodMpmService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MoodMpm('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.moods[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
