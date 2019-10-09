import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BkShKeyCodeSharedModule } from 'app/shared/shared.module';
import { ItemHistoryComponent } from './item-history.component';
import { ItemHistoryDetailComponent } from './item-history-detail.component';
import { ItemHistoryUpdateComponent } from './item-history-update.component';
import { ItemHistoryDeletePopupComponent, ItemHistoryDeleteDialogComponent } from './item-history-delete-dialog.component';
import { itemHistoryRoute, itemHistoryPopupRoute } from './item-history.route';

const ENTITY_STATES = [...itemHistoryRoute, ...itemHistoryPopupRoute];

@NgModule({
  imports: [BkShKeyCodeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ItemHistoryComponent,
    ItemHistoryDetailComponent,
    ItemHistoryUpdateComponent,
    ItemHistoryDeleteDialogComponent,
    ItemHistoryDeletePopupComponent
  ],
  entryComponents: [ItemHistoryDeleteDialogComponent]
})
export class BkShKeyCodeItemHistoryModule {}
