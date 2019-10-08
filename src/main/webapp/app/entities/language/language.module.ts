import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BkShKeyCodeSharedModule } from 'app/shared/shared.module';
import { LanguageComponent } from './language.component';
import { LanguageDetailComponent } from './language-detail.component';
import { LanguageUpdateComponent } from './language-update.component';
import { LanguageDeletePopupComponent, LanguageDeleteDialogComponent } from './language-delete-dialog.component';
import { languageRoute, languagePopupRoute } from './language.route';

const ENTITY_STATES = [...languageRoute, ...languagePopupRoute];

@NgModule({
  imports: [BkShKeyCodeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LanguageComponent,
    LanguageDetailComponent,
    LanguageUpdateComponent,
    LanguageDeleteDialogComponent,
    LanguageDeletePopupComponent
  ],
  entryComponents: [LanguageDeleteDialogComponent]
})
export class BkShKeyCodeLanguageModule {}
