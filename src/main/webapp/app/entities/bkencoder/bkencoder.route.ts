import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Bkencoder, IBkencoder } from 'app/shared/model/bkencoder.model';
import { BkencoderService } from './bkencoder.service';
import { BkencoderComponent } from './bkencoder.component';
import { BkencoderDetailComponent } from './bkencoder-detail.component';
import { BkencoderUpdateComponent } from './bkencoder-update.component';
import { BkencoderDeletePopupComponent } from './bkencoder-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class BkencoderResolve implements Resolve<IBkencoder> {
  constructor(private service: BkencoderService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBkencoder> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Bkencoder>) => response.ok),
        map((bkencoder: HttpResponse<Bkencoder>) => bkencoder.body)
      );
    }
    return of(new Bkencoder());
  }
}

export const bkencoderRoute: Routes = [
  {
    path: '',
    component: BkencoderComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.bkencoder.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BkencoderDetailComponent,
    resolve: {
      bkencoder: BkencoderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.bkencoder.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BkencoderUpdateComponent,
    resolve: {
      bkencoder: BkencoderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.bkencoder.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BkencoderUpdateComponent,
    resolve: {
      bkencoder: BkencoderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.bkencoder.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const bkencoderPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: BkencoderDeletePopupComponent,
    resolve: {
      bkencoder: BkencoderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.bkencoder.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
