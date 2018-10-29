/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CampFireTestModule } from '../../../test.module';
import { FolderMpmUpdateComponent } from 'app/entities/folder-mpm/folder-mpm-update.component';
import { FolderMpmService } from 'app/entities/folder-mpm/folder-mpm.service';
import { FolderMpm } from 'app/shared/model/folder-mpm.model';

describe('Component Tests', () => {
    describe('FolderMpm Management Update Component', () => {
        let comp: FolderMpmUpdateComponent;
        let fixture: ComponentFixture<FolderMpmUpdateComponent>;
        let service: FolderMpmService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [FolderMpmUpdateComponent]
            })
                .overrideTemplate(FolderMpmUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FolderMpmUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FolderMpmService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FolderMpm('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.folder = entity;
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
                    const entity = new FolderMpm();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.folder = entity;
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
