import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IItemReference } from 'app/shared/model/item-reference.model';

type EntityResponseType = HttpResponse<IItemReference>;
type EntityArrayResponseType = HttpResponse<IItemReference[]>;

@Injectable({ providedIn: 'root' })
export class ItemReferenceService {
  public resourceUrl = SERVER_API_URL + 'api/item-references';

  constructor(protected http: HttpClient) {}

  create(itemReference: IItemReference): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemReference);
    return this.http
      .post<IItemReference>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(itemReference: IItemReference): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemReference);
    return this.http
      .put<IItemReference>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IItemReference>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IItemReference[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(itemReference: IItemReference): IItemReference {
    const copy: IItemReference = Object.assign({}, itemReference, {
      timestamp: itemReference.timestamp != null && itemReference.timestamp.isValid() ? itemReference.timestamp.toJSON() : null
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
      res.body.forEach((itemReference: IItemReference) => {
        itemReference.timestamp = itemReference.timestamp != null ? moment(itemReference.timestamp) : null;
      });
    }
    return res;
  }
}
