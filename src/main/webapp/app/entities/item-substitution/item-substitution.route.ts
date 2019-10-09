import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ItemSubstitution } from 'app/shared/model/item-substitution.model';
import { ItemSubstitutionService } from './item-substitution.service';
import { ItemSubstitutionComponent } from './item-substitution.component';
import { ItemSubstitutionDetailComponent } from './item-substitution-detail.component';
import { ItemSubstitutionUpdateComponent } from './item-substitution-update.component';
import { ItemSubstitutionDeletePopupComponent } from './item-substitution-delete-dialog.component';
import { IItemSubstitution } from 'app/shared/model/item-substitution.model';

@Injectable({ providedIn: 'root' })
export class ItemSubstitutionResolve implements Resolve<IItemSubstitution> {
  constructor(private service: ItemSubstitutionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IItemSubstitution> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ItemSubstitution>) => response.ok),
        map((itemSubstitution: HttpResponse<ItemSubstitution>) => itemSubstitution.body)
      );
    }
    return of(new ItemSubstitution());
  }
}

export const itemSubstitutionRoute: Routes = [
  {
    path: '',
    component: ItemSubstitutionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'bkShKeyCodeApp.itemSubstitution.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ItemSubstitutionDetailComponent,
    resolve: {
      itemSubstitution: ItemSubstitutionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemSubstitution.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ItemSubstitutionUpdateComponent,
    resolve: {
      itemSubstitution: ItemSubstitutionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemSubstitution.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ItemSubstitutionUpdateComponent,
    resolve: {
      itemSubstitution: ItemSubstitutionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemSubstitution.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const itemSubstitutionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ItemSubstitutionDeletePopupComponent,
    resolve: {
      itemSubstitution: ItemSubstitutionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bkShKeyCodeApp.itemSubstitution.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
