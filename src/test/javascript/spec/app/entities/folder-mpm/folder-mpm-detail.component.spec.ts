/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CampFireTestModule } from '../../../test.module';
import { FolderMpmDetailComponent } from 'app/entities/folder-mpm/folder-mpm-detail.component';
import { FolderMpm } from 'app/shared/model/folder-mpm.model';

describe('Component Tests', () => {
    describe('FolderMpm Management Detail Component', () => {
        let comp: FolderMpmDetailComponent;
        let fixture: ComponentFixture<FolderMpmDetailComponent>;
        const route = ({ data: of({ folder: new FolderMpm('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CampFireTestModule],
                declarations: [FolderMpmDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FolderMpmDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FolderMpmDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.folder).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
