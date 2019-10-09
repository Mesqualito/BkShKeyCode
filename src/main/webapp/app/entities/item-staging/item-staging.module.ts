import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BkShKeyCodeSharedModule } from 'app/shared/shared.module';
import { ItemStagingComponent } from './item-staging.component';
import { ItemStagingDetailComponent } from './item-staging-detail.component';
import { ItemStagingUpdateComponent } from './item-staging-update.component';
import { ItemStagingDeletePopupComponent, ItemStagingDeleteDialogComponent } from './item-staging-delete-dialog.component';
import { itemStagingRoute, itemStagingPopupRoute } from './item-staging.route';

const ENTITY_STATES = [...itemStagingRoute, ...itemStagingPopupRoute];

@NgModule({
  imports: [BkShKeyCodeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ItemStagingComponent,
    ItemStagingDetailComponent,
    ItemStagingUpdateComponent,
    ItemStagingDeleteDialogComponent,
    ItemStagingDeletePopupComponent
  ],
  entryComponents: [ItemStagingDeleteDialogComponent]
})
export class BkShKeyCodeItemStagingModule {}
