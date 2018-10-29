import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFolderMpm } from 'app/shared/model/folder-mpm.model';
import { FolderMpmService } from './folder-mpm.service';
import { ITeamMpm } from 'app/shared/model/team-mpm.model';
import { TeamMpmService } from 'app/entities/team-mpm';

@Component({
    selector: 'jhi-folder-mpm-update',
    templateUrl: './folder-mpm-update.component.html'
})
export class FolderMpmUpdateComponent implements OnInit {
    folder: IFolderMpm;
    isSaving: boolean;

    teams: ITeamMpm[];

    folders: IFolderMpm[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private folderService: FolderMpmService,
        private teamService: TeamMpmService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ folder }) => {
            this.folder = folder;
        });
        this.teamService.query().subscribe(
            (res: HttpResponse<ITeamMpm[]>) => {
                this.teams = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.folderService.query().subscribe(
            (res: HttpResponse<IFolderMpm[]>) => {
                this.folders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.folder.id !== undefined) {
            this.subscribeToSaveResponse(this.folderService.update(this.folder));
        } else {
            this.subscribeToSaveResponse(this.folderService.create(this.folder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFolderMpm>>) {
        result.subscribe((res: HttpResponse<IFolderMpm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTeamById(index: number, item: ITeamMpm) {
        return item.id;
    }

    trackFolderById(index: number, item: IFolderMpm) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
