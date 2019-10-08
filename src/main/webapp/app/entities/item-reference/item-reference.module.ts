import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BkShKeyCodeSharedModule } from 'app/shared/shared.module';
import { ItemReferenceComponent } from './item-reference.component';
import { ItemReferenceDetailComponent } from './item-reference-detail.component';
import { ItemReferenceUpdateComponent } from './item-reference-update.component';
import { ItemReferenceDeletePopupComponent, ItemReferenceDeleteDialogComponent } from './item-reference-delete-dialog.component';
import { itemReferenceRoute, itemReferencePopupRoute } from './item-reference.route';

const ENTITY_STATES = [...itemReferenceRoute, ...itemReferencePopupRoute];

@NgModule({
  imports: [BkShKeyCodeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ItemReferenceComponent,
    ItemReferenceDetailComponent,
    ItemReferenceUpdateComponent,
    ItemReferenceDeleteDialogComponent,
    ItemReferenceDeletePopupComponent
  ],
  entryComponents: [ItemReferenceDeleteDialogComponent]
})
export class BkShKeyCodeItemReferenceModule {}
