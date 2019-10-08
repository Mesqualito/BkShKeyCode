import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BkShKeyCodeSharedModule } from 'app/shared/shared.module';
import { ExtendedTextHeaderComponent } from './extended-text-header.component';
import { ExtendedTextHeaderDetailComponent } from './extended-text-header-detail.component';
import { ExtendedTextHeaderUpdateComponent } from './extended-text-header-update.component';
import {
  ExtendedTextHeaderDeletePopupComponent,
  ExtendedTextHeaderDeleteDialogComponent
} from './extended-text-header-delete-dialog.component';
import { extendedTextHeaderRoute, extendedTextHeaderPopupRoute } from './extended-text-header.route';

const ENTITY_STATES = [...extendedTextHeaderRoute, ...extendedTextHeaderPopupRoute];

@NgModule({
  imports: [BkShKeyCodeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ExtendedTextHeaderComponent,
    ExtendedTextHeaderDetailComponent,
    ExtendedTextHeaderUpdateComponent,
    ExtendedTextHeaderDeleteDialogComponent,
    ExtendedTextHeaderDeletePopupComponent
  ],
  entryComponents: [ExtendedTextHeaderDeleteDialogComponent]
})
export class BkShKeyCodeExtendedTextHeaderModule {}
