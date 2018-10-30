/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CampFireTestModule } from '../../../test.module';
import { UserDetailsMpmComponent } from 'app/entities/user-details-mpm/user-details-mpm.component';
import { UserDetailsMpmService } from 'app/entities/user-details-mpm/user-details-mpm.service';
import { UserDetailsMpm } from 'app/shared/model/user-details-mpm.model';

describe('Component Tests', () => {
    describe('UserDetailsMpm Management Component', () => {
        let comp: UserDetailsMpmComponent;
        let fixture: ComponentFixture<UserDetailsMpmComponent>;
        let service: UserDetailsMpmService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [UserDetailsMpmComponent],
                providers: []
            })
                .overrideTemplate(UserDetailsMpmComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserDetailsMpmComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserDetailsMpmService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UserDetailsMpm('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.userDetails[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
