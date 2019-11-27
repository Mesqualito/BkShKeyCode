import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {BkShKeyCodeSharedModule} from 'app/shared/shared.module';
import {BkencoderComponent} from './bkencoder.component';
import {bkencoderRoute} from './bkencoder.route';

const ENTITY_STATES = [...bkencoderRoute];

@NgModule({
  imports: [BkShKeyCodeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    BkencoderComponent
  ],
})
export class BkShKeyCodeBkencoderModule {}
