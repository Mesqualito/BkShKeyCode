import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItemStaging } from 'app/shared/model/item-staging.model';

@Component({
  selector: 'jhi-item-staging-detail',
  templateUrl: './item-staging-detail.component.html'
})
export class ItemStagingDetailComponent implements OnInit {
  itemStaging: IItemStaging;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemStaging }) => {
      this.itemStaging = itemStaging;
    });
  }

  previousState() {
    window.history.back();
  }
}
