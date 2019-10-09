import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUom } from 'app/shared/model/uom.model';

@Component({
  selector: 'jhi-uom-detail',
  templateUrl: './uom-detail.component.html'
})
export class UomDetailComponent implements OnInit {
  uom: IUom;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ uom }) => {
      this.uom = uom;
    });
  }

  previousState() {
    window.history.back();
  }
}
