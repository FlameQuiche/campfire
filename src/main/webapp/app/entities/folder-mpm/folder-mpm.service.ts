import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFolderMpm } from 'app/shared/model/folder-mpm.model';

type EntityResponseType = HttpResponse<IFolderMpm>;
type EntityArrayResponseType = HttpResponse<IFolderMpm[]>;

@Injectable({ providedIn: 'root' })
export class FolderMpmService {
    public resourceUrl = SERVER_API_URL + 'api/folders';

    constructor(private http: HttpClient) {}

    create(folder: IFolderMpm): Observable<EntityResponseType> {
        return this.http.post<IFolderMpm>(this.resourceUrl, folder, { observe: 'response' });
    }

    update(folder: IFolderMpm): Observable<EntityResponseType> {
        return this.http.put<IFolderMpm>(this.resourceUrl, folder, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IFolderMpm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFolderMpm[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
