import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ItemReference } from 'app/shared/model/item-reference.model';
import { ItemReferenceService } from './item-reference.service';
import { ItemReferenceComponent } from './item-reference.component';
import { ItemReferenceDetailComponent } from './item-reference-detail.component';
import { ItemReferenceUpdateComponent } from './item-reference-update.component';
import { ItemReferenceDeletePopupComponent } from './item-reference-delete-dialog.component';
import { IItemReference } from 'app/shared/model/item-reference.model';

@Injectable({ providedIn: 'root' })
export class ItemReferenceResolve implements Resolve<IItemReference> {
  constructor(private service: ItemReferenceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IItemReference> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ItemReference>) => response.ok),
        map((itemReference: HttpResponse<ItemReference>) => itemReference.body)
      );
    }
    return of(new ItemReference());
  }
}

export const itemReferenceRoute: Routes = [
  {
    path: '',
    component: ItemReferenceComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'bkShKeyCodeApp.itemReference.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ItemReferenceDetailComponent,
    resolve: {
      itemReference: ItemReferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemReference.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ItemReferenceUpdateComponent,
    resolve: {
      itemReference: ItemReferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemReference.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ItemReferenceUpdateComponent,
    resolve: {
      itemReference: ItemReferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemReference.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const itemReferencePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ItemReferenceDeletePopupComponent,
    resolve: {
      itemReference: ItemReferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemReference.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
