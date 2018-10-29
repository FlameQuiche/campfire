import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITeamMpm } from 'app/shared/model/team-mpm.model';

type EntityResponseType = HttpResponse<ITeamMpm>;
type EntityArrayResponseType = HttpResponse<ITeamMpm[]>;

@Injectable({ providedIn: 'root' })
export class TeamMpmService {
    public resourceUrl = SERVER_API_URL + 'api/teams';

    constructor(private http: HttpClient) {}

    create(team: ITeamMpm): Observable<EntityResponseType> {
        return this.http.post<ITeamMpm>(this.resourceUrl, team, { observe: 'response' });
    }

    update(team: ITeamMpm): Observable<EntityResponseType> {
        return this.http.put<ITeamMpm>(this.resourceUrl, team, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ITeamMpm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITeamMpm[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
