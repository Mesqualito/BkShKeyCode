import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BkShKeyCodeSharedModule } from 'app/shared/shared.module';
import { UomComponent } from './uom.component';
import { UomDetailComponent } from './uom-detail.component';
import { UomUpdateComponent } from './uom-update.component';
import { UomDeleteDialogComponent, UomDeletePopupComponent } from './uom-delete-dialog.component';
import { uomPopupRoute, uomRoute } from './uom.route';

const ENTITY_STATES = [...uomRoute, ...uomPopupRoute];

@NgModule({
  imports: [BkShKeyCodeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [UomComponent, UomDetailComponent, UomUpdateComponent, UomDeleteDialogComponent, UomDeletePopupComponent],
  entryComponents: [UomDeleteDialogComponent]
})
export class BkShKeyCodeUomModule {}
