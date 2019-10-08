import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IPropPosition, PropPosition } from 'app/shared/model/prop-position.model';
import { PropPositionService } from './prop-position.service';
import { PropPositionComponent } from './prop-position.component';
import { PropPositionDetailComponent } from './prop-position-detail.component';
import { PropPositionUpdateComponent } from './prop-position-update.component';
import { PropPositionDeletePopupComponent } from './prop-position-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class PropPositionResolve implements Resolve<IPropPosition> {
  constructor(private service: PropPositionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPropPosition> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PropPosition>) => response.ok),
        map((propPosition: HttpResponse<PropPosition>) => propPosition.body)
      );
    }
    return of(new PropPosition());
  }
}

export const propPositionRoute: Routes = [
  {
    path: '',
    component: PropPositionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'bkShKeyCodeApp.propPosition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PropPositionDetailComponent,
    resolve: {
      propPosition: PropPositionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.propPosition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PropPositionUpdateComponent,
    resolve: {
      propPosition: PropPositionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.propPosition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PropPositionUpdateComponent,
    resolve: {
      propPosition: PropPositionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.propPosition.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const propPositionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PropPositionDeletePopupComponent,
    resolve: {
      propPosition: PropPositionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.propPosition.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
