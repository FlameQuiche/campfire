import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBookmarkMpm } from 'app/shared/model/bookmark-mpm.model';

type EntityResponseType = HttpResponse<IBookmarkMpm>;
type EntityArrayResponseType = HttpResponse<IBookmarkMpm[]>;

@Injectable({ providedIn: 'root' })
export class BookmarkMpmService {
    public resourceUrl = SERVER_API_URL + 'api/bookmarks';

    constructor(private http: HttpClient) {}

    create(bookmark: IBookmarkMpm): Observable<EntityResponseType> {
        return this.http.post<IBookmarkMpm>(this.resourceUrl, bookmark, { observe: 'response' });
    }

    update(bookmark: IBookmarkMpm): Observable<EntityResponseType> {
        return this.http.put<IBookmarkMpm>(this.resourceUrl, bookmark, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IBookmarkMpm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBookmarkMpm[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
