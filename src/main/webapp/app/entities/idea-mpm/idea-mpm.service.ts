import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIdeaMpm } from 'app/shared/model/idea-mpm.model';

type EntityResponseType = HttpResponse<IIdeaMpm>;
type EntityArrayResponseType = HttpResponse<IIdeaMpm[]>;

@Injectable({ providedIn: 'root' })
export class IdeaMpmService {
    public resourceUrl = SERVER_API_URL + 'api/ideas';

    constructor(private http: HttpClient) {}

    create(idea: IIdeaMpm): Observable<EntityResponseType> {
        return this.http.post<IIdeaMpm>(this.resourceUrl, idea, { observe: 'response' });
    }

    update(idea: IIdeaMpm): Observable<EntityResponseType> {
        return this.http.put<IIdeaMpm>(this.resourceUrl, idea, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IIdeaMpm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IIdeaMpm[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
