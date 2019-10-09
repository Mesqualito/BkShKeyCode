import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItemHistory } from 'app/shared/model/item-history.model';

@Component({
  selector: 'jhi-item-history-detail',
  templateUrl: './item-history-detail.component.html'
})
export class ItemHistoryDetailComponent implements OnInit {
  itemHistory: IItemHistory;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemHistory }) => {
      this.itemHistory = itemHistory;
    });
  }

  previousState() {
    window.history.back();
  }
}
