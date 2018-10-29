import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISprintMpm } from 'app/shared/model/sprint-mpm.model';

type EntityResponseType = HttpResponse<ISprintMpm>;
type EntityArrayResponseType = HttpResponse<ISprintMpm[]>;

@Injectable({ providedIn: 'root' })
export class SprintMpmService {
    public resourceUrl = SERVER_API_URL + 'api/sprints';

    constructor(private http: HttpClient) {}

    create(sprint: ISprintMpm): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(sprint);
        return this.http
            .post<ISprintMpm>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(sprint: ISprintMpm): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(sprint);
        return this.http
            .put<ISprintMpm>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<ISprintMpm>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISprintMpm[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(sprint: ISprintMpm): ISprintMpm {
        const copy: ISprintMpm = Object.assign({}, sprint, {
            beginDate: sprint.beginDate != null && sprint.beginDate.isValid() ? sprint.beginDate.format(DATE_FORMAT) : null,
            endDate: sprint.endDate != null && sprint.endDate.isValid() ? sprint.endDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.beginDate = res.body.beginDate != null ? moment(res.body.beginDate) : null;
        res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((sprint: ISprintMpm) => {
            sprint.beginDate = sprint.beginDate != null ? moment(sprint.beginDate) : null;
            sprint.endDate = sprint.endDate != null ? moment(sprint.endDate) : null;
        });
        return res;
    }
}
