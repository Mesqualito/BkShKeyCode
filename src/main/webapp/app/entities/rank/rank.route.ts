import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Rank } from 'app/shared/model/rank.model';
import { RankService } from './rank.service';
import { RankComponent } from './rank.component';
import { RankDetailComponent } from './rank-detail.component';
import { RankUpdateComponent } from './rank-update.component';
import { RankDeletePopupComponent } from './rank-delete-dialog.component';
import { IRank } from 'app/shared/model/rank.model';

@Injectable({ providedIn: 'root' })
export class RankResolve implements Resolve<IRank> {
  constructor(private service: RankService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRank> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Rank>) => response.ok),
        map((rank: HttpResponse<Rank>) => rank.body)
      );
    }
    return of(new Rank());
  }
}

export const rankRoute: Routes = [
  {
    path: '',
    component: RankComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'bkShKeyCodeApp.rank.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RankDetailComponent,
    resolve: {
      rank: RankResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.rank.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RankUpdateComponent,
    resolve: {
      rank: RankResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.rank.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RankUpdateComponent,
    resolve: {
      rank: RankResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.rank.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const rankPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RankDeletePopupComponent,
    resolve: {
      rank: RankResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.rank.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
