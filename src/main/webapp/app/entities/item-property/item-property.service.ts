import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IItemProperty } from 'app/shared/model/item-property.model';

type EntityResponseType = HttpResponse<IItemProperty>;
type EntityArrayResponseType = HttpResponse<IItemProperty[]>;

@Injectable({ providedIn: 'root' })
export class ItemPropertyService {
  public resourceUrl = SERVER_API_URL + 'api/item-properties';

  constructor(protected http: HttpClient) {}

  create(itemProperty: IItemProperty): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemProperty);
    return this.http
      .post<IItemProperty>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(itemProperty: IItemProperty): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemProperty);
    return this.http
      .put<IItemProperty>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IItemProperty>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IItemProperty[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(itemProperty: IItemProperty): IItemProperty {
    const copy: IItemProperty = Object.assign({}, itemProperty, {
      timestamp: itemProperty.timestamp != null && itemProperty.timestamp.isValid() ? itemProperty.timestamp.toJSON() : null,
      modificationDate:
        itemProperty.modificationDate != null && itemProperty.modificationDate.isValid() ? itemProperty.modificationDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.timestamp = res.body.timestamp != null ? moment(res.body.timestamp) : null;
      res.body.modificationDate = res.body.modificationDate != null ? moment(res.body.modificationDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((itemProperty: IItemProperty) => {
        itemProperty.timestamp = itemProperty.timestamp != null ? moment(itemProperty.timestamp) : null;
        itemProperty.modificationDate = itemProperty.modificationDate != null ? moment(itemProperty.modificationDate) : null;
      });
    }
    return res;
  }
}
