import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BkShKeyCodeSharedModule } from 'app/shared/shared.module';
import { PropPositionComponent } from './prop-position.component';
import { PropPositionDetailComponent } from './prop-position-detail.component';
import { PropPositionUpdateComponent } from './prop-position-update.component';
import { PropPositionDeleteDialogComponent, PropPositionDeletePopupComponent } from './prop-position-delete-dialog.component';
import { propPositionPopupRoute, propPositionRoute } from './prop-position.route';

const ENTITY_STATES = [...propPositionRoute, ...propPositionPopupRoute];

@NgModule({
  imports: [BkShKeyCodeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PropPositionComponent,
    PropPositionDetailComponent,
    PropPositionUpdateComponent,
    PropPositionDeleteDialogComponent,
    PropPositionDeletePopupComponent
  ],
  entryComponents: [PropPositionDeleteDialogComponent]
})
export class BkShKeyCodePropPositionModule {}
