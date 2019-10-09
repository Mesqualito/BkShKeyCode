import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItemProperty } from 'app/shared/model/item-property.model';

@Component({
  selector: 'jhi-item-property-detail',
  templateUrl: './item-property-detail.component.html'
})
export class ItemPropertyDetailComponent implements OnInit {
  itemProperty: IItemProperty;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemProperty }) => {
      this.itemProperty = itemProperty;
    });
  }

  previousState() {
    window.history.back();
  }
}
