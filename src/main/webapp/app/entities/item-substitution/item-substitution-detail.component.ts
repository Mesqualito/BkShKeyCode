import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItemSubstitution } from 'app/shared/model/item-substitution.model';

@Component({
  selector: 'jhi-item-substitution-detail',
  templateUrl: './item-substitution-detail.component.html'
})
export class ItemSubstitutionDetailComponent implements OnInit {
  itemSubstitution: IItemSubstitution;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemSubstitution }) => {
      this.itemSubstitution = itemSubstitution;
    });
  }

  previousState() {
    window.history.back();
  }
}
