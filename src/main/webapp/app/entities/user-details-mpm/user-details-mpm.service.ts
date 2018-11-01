import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserDetailsMpm } from 'app/shared/model/user-details-mpm.model';

type EntityResponseType = HttpResponse<IUserDetailsMpm>;
type EntityArrayResponseType = HttpResponse<IUserDetailsMpm[]>;

@Injectable({ providedIn: 'root' })
export class UserDetailsMpmService {
    public resourceUrl = SERVER_API_URL + 'api/user-details';

    constructor(private http: HttpClient) {}

    create(userDetails: IUserDetailsMpm): Observable<EntityResponseType> {
        return this.http.post<IUserDetailsMpm>(this.resourceUrl, userDetails, { observe: 'response' });
    }

    update(userDetails: IUserDetailsMpm): Observable<EntityResponseType> {
        return this.http.put<IUserDetailsMpm>(this.resourceUrl, userDetails, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IUserDetailsMpm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUserDetailsMpm[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
