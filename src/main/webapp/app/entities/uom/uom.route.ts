import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IUom, Uom } from 'app/shared/model/uom.model';
import { UomService } from './uom.service';
import { UomComponent } from './uom.component';
import { UomDetailComponent } from './uom-detail.component';
import { UomUpdateComponent } from './uom-update.component';
import { UomDeletePopupComponent } from './uom-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class UomResolve implements Resolve<IUom> {
  constructor(private service: UomService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUom> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Uom>) => response.ok),
        map((uom: HttpResponse<Uom>) => uom.body)
      );
    }
    return of(new Uom());
  }
}

export const uomRoute: Routes = [
  {
    path: '',
    component: UomComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'bkShKeyCodeApp.uom.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UomDetailComponent,
    resolve: {
      uom: UomResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.uom.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UomUpdateComponent,
    resolve: {
      uom: UomResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.uom.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UomUpdateComponent,
    resolve: {
      uom: UomResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.uom.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const uomPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UomDeletePopupComponent,
    resolve: {
      uom: UomResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.uom.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
