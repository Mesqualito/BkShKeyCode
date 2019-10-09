import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItemReference } from 'app/shared/model/item-reference.model';

@Component({
  selector: 'jhi-item-reference-detail',
  templateUrl: './item-reference-detail.component.html'
})
export class ItemReferenceDetailComponent implements OnInit {
  itemReference: IItemReference;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemReference }) => {
      this.itemReference = itemReference;
    });
  }

  previousState() {
    window.history.back();
  }
}
