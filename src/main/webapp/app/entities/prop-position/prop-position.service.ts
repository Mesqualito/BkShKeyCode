import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPropPosition } from 'app/shared/model/prop-position.model';

type EntityResponseType = HttpResponse<IPropPosition>;
type EntityArrayResponseType = HttpResponse<IPropPosition[]>;

@Injectable({ providedIn: 'root' })
export class PropPositionService {
  public resourceUrl = SERVER_API_URL + 'api/prop-positions';

  constructor(protected http: HttpClient) {}

  create(propPosition: IPropPosition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(propPosition);
    return this.http
      .post<IPropPosition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(propPosition: IPropPosition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(propPosition);
    return this.http
      .put<IPropPosition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPropPosition>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPropPosition[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(propPosition: IPropPosition): IPropPosition {
    const copy: IPropPosition = Object.assign({}, propPosition, {
      timestamp: propPosition.timestamp != null && propPosition.timestamp.isValid() ? propPosition.timestamp.toJSON() : null
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
      res.body.forEach((propPosition: IPropPosition) => {
        propPosition.timestamp = propPosition.timestamp != null ? moment(propPosition.timestamp) : null;
      });
    }
    return res;
  }
}
