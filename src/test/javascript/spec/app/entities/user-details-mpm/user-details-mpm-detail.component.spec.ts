/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CampFireTestModule } from '../../../test.module';
import { UserDetailsMpmDetailComponent } from 'app/entities/user-details-mpm/user-details-mpm-detail.component';
import { UserDetailsMpm } from 'app/shared/model/user-details-mpm.model';

describe('Component Tests', () => {
    describe('UserDetailsMpm Management Detail Component', () => {
        let comp: UserDetailsMpmDetailComponent;
        let fixture: ComponentFixture<UserDetailsMpmDetailComponent>;
        const route = ({ data: of({ userDetails: new UserDetailsMpm('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [UserDetailsMpmDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UserDetailsMpmDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserDetailsMpmDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.userDetails).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
