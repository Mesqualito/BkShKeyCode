import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ItemProperty } from 'app/shared/model/item-property.model';
import { ItemPropertyService } from './item-property.service';
import { ItemPropertyComponent } from './item-property.component';
import { ItemPropertyDetailComponent } from './item-property-detail.component';
import { ItemPropertyUpdateComponent } from './item-property-update.component';
import { ItemPropertyDeletePopupComponent } from './item-property-delete-dialog.component';
import { IItemProperty } from 'app/shared/model/item-property.model';

@Injectable({ providedIn: 'root' })
export class ItemPropertyResolve implements Resolve<IItemProperty> {
  constructor(private service: ItemPropertyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IItemProperty> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ItemProperty>) => response.ok),
        map((itemProperty: HttpResponse<ItemProperty>) => itemProperty.body)
      );
    }
    return of(new ItemProperty());
  }
}

export const itemPropertyRoute: Routes = [
  {
    path: '',
    component: ItemPropertyComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'bkShKeyCodeApp.itemProperty.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ItemPropertyDetailComponent,
    resolve: {
      itemProperty: ItemPropertyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemProperty.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ItemPropertyUpdateComponent,
    resolve: {
      itemProperty: ItemPropertyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemProperty.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ItemPropertyUpdateComponent,
    resolve: {
      itemProperty: ItemPropertyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemProperty.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const itemPropertyPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ItemPropertyDeletePopupComponent,
    resolve: {
      itemProperty: ItemPropertyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemProperty.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
