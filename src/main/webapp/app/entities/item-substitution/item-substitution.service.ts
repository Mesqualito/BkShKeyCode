import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IItemSubstitution } from 'app/shared/model/item-substitution.model';

type EntityResponseType = HttpResponse<IItemSubstitution>;
type EntityArrayResponseType = HttpResponse<IItemSubstitution[]>;

@Injectable({ providedIn: 'root' })
export class ItemSubstitutionService {
  public resourceUrl = SERVER_API_URL + 'api/item-substitutions';

  constructor(protected http: HttpClient) {}

  create(itemSubstitution: IItemSubstitution): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemSubstitution);
    return this.http
      .post<IItemSubstitution>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(itemSubstitution: IItemSubstitution): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemSubstitution);
    return this.http
      .put<IItemSubstitution>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IItemSubstitution>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IItemSubstitution[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(itemSubstitution: IItemSubstitution): IItemSubstitution {
    const copy: IItemSubstitution = Object.assign({}, itemSubstitution, {
      timestamp: itemSubstitution.timestamp != null && itemSubstitution.timestamp.isValid() ? itemSubstitution.timestamp.toJSON() : null,
      origCheckDate:
        itemSubstitution.origCheckDate != null && itemSubstitution.origCheckDate.isValid() ? itemSubstitution.origCheckDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.timestamp = res.body.timestamp != null ? moment(res.body.timestamp) : null;
      res.body.origCheckDate = res.body.origCheckDate != null ? moment(res.body.origCheckDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((itemSubstitution: IItemSubstitution) => {
        itemSubstitution.timestamp = itemSubstitution.timestamp != null ? moment(itemSubstitution.timestamp) : null;
        itemSubstitution.origCheckDate = itemSubstitution.origCheckDate != null ? moment(itemSubstitution.origCheckDate) : null;
      });
    }
    return res;
  }
}
