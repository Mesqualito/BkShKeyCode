import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BkShKeyCodeSharedModule } from 'app/shared/shared.module';
import { ExtendedTextLineComponent } from './extended-text-line.component';
import { ExtendedTextLineDetailComponent } from './extended-text-line-detail.component';
import { ExtendedTextLineUpdateComponent } from './extended-text-line-update.component';
import { ExtendedTextLineDeletePopupComponent, ExtendedTextLineDeleteDialogComponent } from './extended-text-line-delete-dialog.component';
import { extendedTextLineRoute, extendedTextLinePopupRoute } from './extended-text-line.route';

const ENTITY_STATES = [...extendedTextLineRoute, ...extendedTextLinePopupRoute];

@NgModule({
  imports: [BkShKeyCodeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ExtendedTextLineComponent,
    ExtendedTextLineDetailComponent,
    ExtendedTextLineUpdateComponent,
    ExtendedTextLineDeleteDialogComponent,
    ExtendedTextLineDeletePopupComponent
  ],
  entryComponents: [ExtendedTextLineDeleteDialogComponent]
})
export class BkShKeyCodeExtendedTextLineModule {}
