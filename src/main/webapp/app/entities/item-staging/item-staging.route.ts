import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ItemStaging } from 'app/shared/model/item-staging.model';
import { ItemStagingService } from './item-staging.service';
import { ItemStagingComponent } from './item-staging.component';
import { ItemStagingDetailComponent } from './item-staging-detail.component';
import { ItemStagingUpdateComponent } from './item-staging-update.component';
import { ItemStagingDeletePopupComponent } from './item-staging-delete-dialog.component';
import { IItemStaging } from 'app/shared/model/item-staging.model';

@Injectable({ providedIn: 'root' })
export class ItemStagingResolve implements Resolve<IItemStaging> {
  constructor(private service: ItemStagingService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IItemStaging> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ItemStaging>) => response.ok),
        map((itemStaging: HttpResponse<ItemStaging>) => itemStaging.body)
      );
    }
    return of(new ItemStaging());
  }
}

export const itemStagingRoute: Routes = [
  {
    path: '',
    component: ItemStagingComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'bkShKeyCodeApp.itemStaging.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ItemStagingDetailComponent,
    resolve: {
      itemStaging: ItemStagingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemStaging.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ItemStagingUpdateComponent,
    resolve: {
      itemStaging: ItemStagingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemStaging.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ItemStagingUpdateComponent,
    resolve: {
      itemStaging: ItemStagingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemStaging.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const itemStagingPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ItemStagingDeletePopupComponent,
    resolve: {
      itemStaging: ItemStagingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemStaging.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
