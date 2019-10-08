import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'item-staging',
        loadChildren: () => import('./item-staging/item-staging.module').then(m => m.BkShKeyCodeItemStagingModule)
      },
      {
        path: 'item-history',
        loadChildren: () => import('./item-history/item-history.module').then(m => m.BkShKeyCodeItemHistoryModule)
      },
      {
        path: 'item',
        loadChildren: () => import('./item/item.module').then(m => m.BkShKeyCodeItemModule)
      },
      {
        path: 'item-property',
        loadChildren: () => import('./item-property/item-property.module').then(m => m.BkShKeyCodeItemPropertyModule)
      },
      {
        path: 'prop-position',
        loadChildren: () => import('./prop-position/prop-position.module').then(m => m.BkShKeyCodePropPositionModule)
      },
      {
        path: 'language',
        loadChildren: () => import('./language/language.module').then(m => m.BkShKeyCodeLanguageModule)
      },
      {
        path: 'extended-text-header',
        loadChildren: () => import('./extended-text-header/extended-text-header.module').then(m => m.BkShKeyCodeExtendedTextHeaderModule)
      },
      {
        path: 'extended-text-line',
        loadChildren: () => import('./extended-text-line/extended-text-line.module').then(m => m.BkShKeyCodeExtendedTextLineModule)
      },
      {
        path: 'item-reference',
        loadChildren: () => import('./item-reference/item-reference.module').then(m => m.BkShKeyCodeItemReferenceModule)
      },
      {
        path: 'item-substitution',
        loadChildren: () => import('./item-substitution/item-substitution.module').then(m => m.BkShKeyCodeItemSubstitutionModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class BkShKeyCodeEntityModule {}
