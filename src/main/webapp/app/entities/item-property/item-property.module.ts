import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BkShKeyCodeSharedModule } from 'app/shared/shared.module';
import { ItemPropertyComponent } from './item-property.component';
import { ItemPropertyDetailComponent } from './item-property-detail.component';
import { ItemPropertyUpdateComponent } from './item-property-update.component';
import { ItemPropertyDeletePopupComponent, ItemPropertyDeleteDialogComponent } from './item-property-delete-dialog.component';
import { itemPropertyRoute, itemPropertyPopupRoute } from './item-property.route';

const ENTITY_STATES = [...itemPropertyRoute, ...itemPropertyPopupRoute];

@NgModule({
  imports: [BkShKeyCodeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ItemPropertyComponent,
    ItemPropertyDetailComponent,
    ItemPropertyUpdateComponent,
    ItemPropertyDeleteDialogComponent,
    ItemPropertyDeletePopupComponent
  ],
  entryComponents: [ItemPropertyDeleteDialogComponent]
})
export class BkShKeyCodeItemPropertyModule {}
