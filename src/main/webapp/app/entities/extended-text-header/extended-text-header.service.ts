import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExtendedTextHeader } from 'app/shared/model/extended-text-header.model';

type EntityResponseType = HttpResponse<IExtendedTextHeader>;
type EntityArrayResponseType = HttpResponse<IExtendedTextHeader[]>;

@Injectable({ providedIn: 'root' })
export class ExtendedTextHeaderService {
  public resourceUrl = SERVER_API_URL + 'api/extended-text-headers';

  constructor(protected http: HttpClient) {}

  create(extendedTextHeader: IExtendedTextHeader): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(extendedTextHeader);
    return this.http
      .post<IExtendedTextHeader>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(extendedTextHeader: IExtendedTextHeader): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(extendedTextHeader);
    return this.http
      .put<IExtendedTextHeader>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IExtendedTextHeader>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IExtendedTextHeader[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(extendedTextHeader: IExtendedTextHeader): IExtendedTextHeader {
    const copy: IExtendedTextHeader = Object.assign({}, extendedTextHeader, {
      timestamp:
        extendedTextHeader.timestamp != null && extendedTextHeader.timestamp.isValid() ? extendedTextHeader.timestamp.toJSON() : null,
      startingDate:
        extendedTextHeader.startingDate != null && extendedTextHeader.startingDate.isValid()
          ? extendedTextHeader.startingDate.toJSON()
          : null,
      endingDate:
        extendedTextHeader.endingDate != null && extendedTextHeader.endingDate.isValid() ? extendedTextHeader.endingDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.timestamp = res.body.timestamp != null ? moment(res.body.timestamp) : null;
      res.body.startingDate = res.body.startingDate != null ? moment(res.body.startingDate) : null;
      res.body.endingDate = res.body.endingDate != null ? moment(res.body.endingDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((extendedTextHeader: IExtendedTextHeader) => {
        extendedTextHeader.timestamp = extendedTextHeader.timestamp != null ? moment(extendedTextHeader.timestamp) : null;
        extendedTextHeader.startingDate = extendedTextHeader.startingDate != null ? moment(extendedTextHeader.startingDate) : null;
        extendedTextHeader.endingDate = extendedTextHeader.endingDate != null ? moment(extendedTextHeader.endingDate) : null;
      });
    }
    return res;
  }
}
