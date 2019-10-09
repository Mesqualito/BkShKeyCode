import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BkShKeyCodeSharedModule } from 'app/shared/shared.module';
import { ItemSubstitutionComponent } from './item-substitution.component';
import { ItemSubstitutionDetailComponent } from './item-substitution-detail.component';
import { ItemSubstitutionUpdateComponent } from './item-substitution-update.component';
import { ItemSubstitutionDeletePopupComponent, ItemSubstitutionDeleteDialogComponent } from './item-substitution-delete-dialog.component';
import { itemSubstitutionRoute, itemSubstitutionPopupRoute } from './item-substitution.route';

const ENTITY_STATES = [...itemSubstitutionRoute, ...itemSubstitutionPopupRoute];

@NgModule({
  imports: [BkShKeyCodeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ItemSubstitutionComponent,
    ItemSubstitutionDetailComponent,
    ItemSubstitutionUpdateComponent,
    ItemSubstitutionDeleteDialogComponent,
    ItemSubstitutionDeletePopupComponent
  ],
  entryComponents: [ItemSubstitutionDeleteDialogComponent]
})
export class BkShKeyCodeItemSubstitutionModule {}
