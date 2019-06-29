import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IItem } from 'app/shared/model/item.model';

type EntityResponseType = HttpResponse<IItem>;
type EntityArrayResponseType = HttpResponse<IItem[]>;

@Injectable({ providedIn: 'root' })
export class ItemService {
    private itemUrl = SERVER_API_URL + 'core/v1/items';
    private imageUrl = SERVER_API_URL + 'core/v1/images';

    constructor(private http: HttpClient) {}

    create(item: IItem): Observable<EntityResponseType> {
        return this.http.post<IItem>(this.itemUrl, item, { observe: 'response' });
    }

    uploadFiles(fd: FormData): Observable<HttpResponse<any>> {
        const url = this.imageUrl + '/upload';
        console.log('post form data: ', fd.get('file'));
        return this.http.post<any>(url, fd, { observe: 'response' });
    }

    update(item: IItem): Observable<EntityResponseType> {
        return this.http.put<IItem>(this.itemUrl, item, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IItem>(`${this.itemUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IItem[]>(this.itemUrl, { params: options, observe: 'response' });
    }

    queryByCustomer(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IItem[]>(this.itemUrl + '/get-by-customer', { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.itemUrl}/${id}`, { observe: 'response' });
    }
}
