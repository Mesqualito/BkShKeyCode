import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ExtendedTextHeader } from 'app/shared/model/extended-text-header.model';
import { ExtendedTextHeaderService } from './extended-text-header.service';
import { ExtendedTextHeaderComponent } from './extended-text-header.component';
import { ExtendedTextHeaderDetailComponent } from './extended-text-header-detail.component';
import { ExtendedTextHeaderUpdateComponent } from './extended-text-header-update.component';
import { ExtendedTextHeaderDeletePopupComponent } from './extended-text-header-delete-dialog.component';
import { IExtendedTextHeader } from 'app/shared/model/extended-text-header.model';

@Injectable({ providedIn: 'root' })
export class ExtendedTextHeaderResolve implements Resolve<IExtendedTextHeader> {
  constructor(private service: ExtendedTextHeaderService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExtendedTextHeader> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ExtendedTextHeader>) => response.ok),
        map((extendedTextHeader: HttpResponse<ExtendedTextHeader>) => extendedTextHeader.body)
      );
    }
    return of(new ExtendedTextHeader());
  }
}

export const extendedTextHeaderRoute: Routes = [
  {
    path: '',
    component: ExtendedTextHeaderComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'bkShKeyCodeApp.extendedTextHeader.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExtendedTextHeaderDetailComponent,
    resolve: {
      extendedTextHeader: ExtendedTextHeaderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.extendedTextHeader.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExtendedTextHeaderUpdateComponent,
    resolve: {
      extendedTextHeader: ExtendedTextHeaderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.extendedTextHeader.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExtendedTextHeaderUpdateComponent,
    resolve: {
      extendedTextHeader: ExtendedTextHeaderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.extendedTextHeader.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const extendedTextHeaderPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ExtendedTextHeaderDeletePopupComponent,
    resolve: {
      extendedTextHeader: ExtendedTextHeaderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.extendedTextHeader.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
