import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IActionMpm } from 'app/shared/model/action-mpm.model';

type EntityResponseType = HttpResponse<IActionMpm>;
type EntityArrayResponseType = HttpResponse<IActionMpm[]>;

@Injectable({ providedIn: 'root' })
export class ActionMpmService {
    public resourceUrl = SERVER_API_URL + 'api/actions';

    constructor(private http: HttpClient) {}

    create(action: IActionMpm): Observable<EntityResponseType> {
        return this.http.post<IActionMpm>(this.resourceUrl, action, { observe: 'response' });
    }

    update(action: IActionMpm): Observable<EntityResponseType> {
        return this.http.put<IActionMpm>(this.resourceUrl, action, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IActionMpm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IActionMpm[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
