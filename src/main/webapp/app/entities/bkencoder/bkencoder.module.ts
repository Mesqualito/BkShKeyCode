import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BkShKeyCodeSharedModule } from 'app/shared/shared.module';
import { BkencoderComponent } from './bkencoder.component';
import { BkencoderDetailComponent } from './bkencoder-detail.component';
import { BkencoderUpdateComponent } from './bkencoder-update.component';
import { BkencoderDeleteDialogComponent, BkencoderDeletePopupComponent } from './bkencoder-delete-dialog.component';
import { bkencoderPopupRoute, bkencoderRoute } from './bkencoder.route';

const ENTITY_STATES = [...bkencoderRoute, ...bkencoderPopupRoute];

@NgModule({
  imports: [BkShKeyCodeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    BkencoderComponent,
    BkencoderDetailComponent,
    BkencoderUpdateComponent,
    BkencoderDeleteDialogComponent,
    BkencoderDeletePopupComponent
  ],
  entryComponents: [BkencoderDeleteDialogComponent]
})
export class BkShKeyCodeBkencoderModule {}
