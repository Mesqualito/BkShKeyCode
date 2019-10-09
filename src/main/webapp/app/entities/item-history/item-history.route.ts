import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ItemHistory } from 'app/shared/model/item-history.model';
import { ItemHistoryService } from './item-history.service';
import { ItemHistoryComponent } from './item-history.component';
import { ItemHistoryDetailComponent } from './item-history-detail.component';
import { ItemHistoryUpdateComponent } from './item-history-update.component';
import { ItemHistoryDeletePopupComponent } from './item-history-delete-dialog.component';
import { IItemHistory } from 'app/shared/model/item-history.model';

@Injectable({ providedIn: 'root' })
export class ItemHistoryResolve implements Resolve<IItemHistory> {
  constructor(private service: ItemHistoryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IItemHistory> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ItemHistory>) => response.ok),
        map((itemHistory: HttpResponse<ItemHistory>) => itemHistory.body)
      );
    }
    return of(new ItemHistory());
  }
}

export const itemHistoryRoute: Routes = [
  {
    path: '',
    component: ItemHistoryComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'bkShKeyCodeApp.itemHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ItemHistoryDetailComponent,
    resolve: {
      itemHistory: ItemHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ItemHistoryUpdateComponent,
    resolve: {
      itemHistory: ItemHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ItemHistoryUpdateComponent,
    resolve: {
      itemHistory: ItemHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const itemHistoryPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ItemHistoryDeletePopupComponent,
    resolve: {
      itemHistory: ItemHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemHistory.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
