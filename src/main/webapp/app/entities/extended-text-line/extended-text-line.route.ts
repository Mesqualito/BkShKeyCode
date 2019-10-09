import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ExtendedTextLine } from 'app/shared/model/extended-text-line.model';
import { ExtendedTextLineService } from './extended-text-line.service';
import { ExtendedTextLineComponent } from './extended-text-line.component';
import { ExtendedTextLineDetailComponent } from './extended-text-line-detail.component';
import { ExtendedTextLineUpdateComponent } from './extended-text-line-update.component';
import { ExtendedTextLineDeletePopupComponent } from './extended-text-line-delete-dialog.component';
import { IExtendedTextLine } from 'app/shared/model/extended-text-line.model';

@Injectable({ providedIn: 'root' })
export class ExtendedTextLineResolve implements Resolve<IExtendedTextLine> {
  constructor(private service: ExtendedTextLineService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExtendedTextLine> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ExtendedTextLine>) => response.ok),
        map((extendedTextLine: HttpResponse<ExtendedTextLine>) => extendedTextLine.body)
      );
    }
    return of(new ExtendedTextLine());
  }
}

export const extendedTextLineRoute: Routes = [
  {
    path: '',
    component: ExtendedTextLineComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'bkShKeyCodeApp.extendedTextLine.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExtendedTextLineDetailComponent,
    resolve: {
      extendedTextLine: ExtendedTextLineResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.extendedTextLine.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExtendedTextLineUpdateComponent,
    resolve: {
      extendedTextLine: ExtendedTextLineResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.extendedTextLine.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExtendedTextLineUpdateComponent,
    resolve: {
      extendedTextLine: ExtendedTextLineResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.extendedTextLine.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const extendedTextLinePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ExtendedTextLineDeletePopupComponent,
    resolve: {
      extendedTextLine: ExtendedTextLineResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.extendedTextLine.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
