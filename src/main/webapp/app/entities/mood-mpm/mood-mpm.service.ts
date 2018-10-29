import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMoodMpm } from 'app/shared/model/mood-mpm.model';

type EntityResponseType = HttpResponse<IMoodMpm>;
type EntityArrayResponseType = HttpResponse<IMoodMpm[]>;

@Injectable({ providedIn: 'root' })
export class MoodMpmService {
    public resourceUrl = SERVER_API_URL + 'api/moods';

    constructor(private http: HttpClient) {}

    create(mood: IMoodMpm): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(mood);
        return this.http
            .post<IMoodMpm>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(mood: IMoodMpm): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(mood);
        return this.http
            .put<IMoodMpm>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IMoodMpm>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMoodMpm[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(mood: IMoodMpm): IMoodMpm {
        const copy: IMoodMpm = Object.assign({}, mood, {
            date: mood.date != null && mood.date.isValid() ? mood.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((mood: IMoodMpm) => {
            mood.date = mood.date != null ? moment(mood.date) : null;
        });
        return res;
    }
}
