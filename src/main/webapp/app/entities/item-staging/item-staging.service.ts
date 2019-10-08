import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IItemStaging } from 'app/shared/model/item-staging.model';

type EntityResponseType = HttpResponse<IItemStaging>;
type EntityArrayResponseType = HttpResponse<IItemStaging[]>;

@Injectable({ providedIn: 'root' })
export class ItemStagingService {
  public resourceUrl = SERVER_API_URL + 'api/item-stagings';

  constructor(protected http: HttpClient) {}

  create(itemStaging: IItemStaging): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemStaging);
    return this.http
      .post<IItemStaging>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(itemStaging: IItemStaging): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemStaging);
    return this.http
      .put<IItemStaging>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IItemStaging>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IItemStaging[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(itemStaging: IItemStaging): IItemStaging {
    const copy: IItemStaging = Object.assign({}, itemStaging, {
      timestamp: itemStaging.timestamp != null && itemStaging.timestamp.isValid() ? itemStaging.timestamp.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.timestamp = res.body.timestamp != null ? moment(res.body.timestamp) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((itemStaging: IItemStaging) => {
        itemStaging.timestamp = itemStaging.timestamp != null ? moment(itemStaging.timestamp) : null;
      });
    }
    return res;
  }
}
