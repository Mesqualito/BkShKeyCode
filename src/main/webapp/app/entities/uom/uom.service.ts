import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUom } from 'app/shared/model/uom.model';

type EntityResponseType = HttpResponse<IUom>;
type EntityArrayResponseType = HttpResponse<IUom[]>;

@Injectable({ providedIn: 'root' })
export class UomService {
  public resourceUrl = SERVER_API_URL + 'api/uoms';

  constructor(protected http: HttpClient) {}

  create(uom: IUom): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(uom);
    return this.http
      .post<IUom>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(uom: IUom): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(uom);
    return this.http
      .put<IUom>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUom>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUom[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(uom: IUom): IUom {
    const copy: IUom = Object.assign({}, uom, {
      timestamp: uom.timestamp != null && uom.timestamp.isValid() ? uom.timestamp.toJSON() : null,
      modificationDate: uom.modificationDate != null && uom.modificationDate.isValid() ? uom.modificationDate.toJSON() : null
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
      res.body.forEach((uom: IUom) => {
        uom.timestamp = uom.timestamp != null ? moment(uom.timestamp) : null;
        uom.modificationDate = uom.modificationDate != null ? moment(uom.modificationDate) : null;
      });
    }
    return res;
  }
}
