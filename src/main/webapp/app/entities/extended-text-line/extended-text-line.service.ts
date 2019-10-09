import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExtendedTextLine } from 'app/shared/model/extended-text-line.model';

type EntityResponseType = HttpResponse<IExtendedTextLine>;
type EntityArrayResponseType = HttpResponse<IExtendedTextLine[]>;

@Injectable({ providedIn: 'root' })
export class ExtendedTextLineService {
  public resourceUrl = SERVER_API_URL + 'api/extended-text-lines';

  constructor(protected http: HttpClient) {}

  create(extendedTextLine: IExtendedTextLine): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(extendedTextLine);
    return this.http
      .post<IExtendedTextLine>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(extendedTextLine: IExtendedTextLine): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(extendedTextLine);
    return this.http
      .put<IExtendedTextLine>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IExtendedTextLine>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IExtendedTextLine[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(extendedTextLine: IExtendedTextLine): IExtendedTextLine {
    const copy: IExtendedTextLine = Object.assign({}, extendedTextLine, {
      timestamp: extendedTextLine.timestamp != null && extendedTextLine.timestamp.isValid() ? extendedTextLine.timestamp.toJSON() : null
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
      res.body.forEach((extendedTextLine: IExtendedTextLine) => {
        extendedTextLine.timestamp = extendedTextLine.timestamp != null ? moment(extendedTextLine.timestamp) : null;
      });
    }
    return res;
  }
}
