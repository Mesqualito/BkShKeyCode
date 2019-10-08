import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRank } from 'app/shared/model/rank.model';

type EntityResponseType = HttpResponse<IRank>;
type EntityArrayResponseType = HttpResponse<IRank[]>;

@Injectable({ providedIn: 'root' })
export class RankService {
  public resourceUrl = SERVER_API_URL + 'api/ranks';

  constructor(protected http: HttpClient) {}

  create(rank: IRank): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rank);
    return this.http
      .post<IRank>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(rank: IRank): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rank);
    return this.http
      .put<IRank>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRank>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRank[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(rank: IRank): IRank {
    const copy: IRank = Object.assign({}, rank, {
      timestamp: rank.timestamp != null && rank.timestamp.isValid() ? rank.timestamp.toJSON() : null
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
      res.body.forEach((rank: IRank) => {
        rank.timestamp = rank.timestamp != null ? moment(rank.timestamp) : null;
      });
    }
    return res;
  }
}
