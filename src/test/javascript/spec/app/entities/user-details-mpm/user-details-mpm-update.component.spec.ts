/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CampFireTestModule } from '../../../test.module';
import { UserDetailsMpmUpdateComponent } from 'app/entities/user-details-mpm/user-details-mpm-update.component';
import { UserDetailsMpmService } from 'app/entities/user-details-mpm/user-details-mpm.service';
import { UserDetailsMpm } from 'app/shared/model/user-details-mpm.model';

describe('Component Tests', () => {
    describe('UserDetailsMpm Management Update Component', () => {
        let comp: UserDetailsMpmUpdateComponent;
        let fixture: ComponentFixture<UserDetailsMpmUpdateComponent>;
        let service: UserDetailsMpmService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [UserDetailsMpmUpdateComponent]
            })
                .overrideTemplate(UserDetailsMpmUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserDetailsMpmUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserDetailsMpmService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserDetailsMpm('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userDetails = entity;
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
                    const entity = new UserDetailsMpm();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userDetails = entity;
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
