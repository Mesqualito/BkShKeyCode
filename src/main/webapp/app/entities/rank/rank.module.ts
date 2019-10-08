import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BkShKeyCodeSharedModule } from 'app/shared/shared.module';
import { RankComponent } from './rank.component';
import { RankDetailComponent } from './rank-detail.component';
import { RankUpdateComponent } from './rank-update.component';
import { RankDeletePopupComponent, RankDeleteDialogComponent } from './rank-delete-dialog.component';
import { rankRoute, rankPopupRoute } from './rank.route';

const ENTITY_STATES = [...rankRoute, ...rankPopupRoute];

@NgModule({
  imports: [BkShKeyCodeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [RankComponent, RankDetailComponent, RankUpdateComponent, RankDeleteDialogComponent, RankDeletePopupComponent],
  entryComponents: [RankDeleteDialogComponent]
})
export class BkShKeyCodeRankModule {}
