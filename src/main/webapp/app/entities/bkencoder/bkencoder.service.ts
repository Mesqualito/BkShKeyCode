import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBkencoder } from 'app/shared/model/bkencoder.model';

type EntityResponseType = HttpResponse<IBkencoder>;
type EntityArrayResponseType = HttpResponse<IBkencoder[]>;

@Injectable({ providedIn: 'root' })
export class BkencoderService {
  public resourceUrl = SERVER_API_URL + 'api/bkencoders';

  constructor(protected http: HttpClient) {}

  create(bkencoder: IBkencoder): Observable<EntityResponseType> {
    return this.http.post<IBkencoder>(this.resourceUrl, bkencoder, { observe: 'response' });
  }

  update(bkencoder: IBkencoder): Observable<EntityResponseType> {
    return this.http.put<IBkencoder>(this.resourceUrl, bkencoder, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBkencoder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBkencoder[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
