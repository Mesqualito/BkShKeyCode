import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IItemHistory } from 'app/shared/model/item-history.model';

type EntityResponseType = HttpResponse<IItemHistory>;
type EntityArrayResponseType = HttpResponse<IItemHistory[]>;

@Injectable({ providedIn: 'root' })
export class ItemHistoryService {
  public resourceUrl = SERVER_API_URL + 'api/item-histories';

  constructor(protected http: HttpClient) {}

  create(itemHistory: IItemHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemHistory);
    return this.http
      .post<IItemHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(itemHistory: IItemHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemHistory);
    return this.http
      .put<IItemHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IItemHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IItemHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(itemHistory: IItemHistory): IItemHistory {
    const copy: IItemHistory = Object.assign({}, itemHistory, {
      timestamp: itemHistory.timestamp != null && itemHistory.timestamp.isValid() ? itemHistory.timestamp.toJSON() : null,
      modificationDate:
        itemHistory.modificationDate != null && itemHistory.modificationDate.isValid() ? itemHistory.modificationDate.toJSON() : null
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
      res.body.forEach((itemHistory: IItemHistory) => {
        itemHistory.timestamp = itemHistory.timestamp != null ? moment(itemHistory.timestamp) : null;
        itemHistory.modificationDate = itemHistory.modificationDate != null ? moment(itemHistory.modificationDate) : null;
      });
    }
    return res;
  }
}
