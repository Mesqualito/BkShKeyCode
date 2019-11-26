import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBkencoder } from 'app/shared/model/bkencoder.model';

@Component({
  selector: 'jhi-bkencoder-detail',
  templateUrl: './bkencoder-detail.component.html'
})
export class BkencoderDetailComponent implements OnInit {
  bkencoder: IBkencoder;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ bkencoder }) => {
      this.bkencoder = bkencoder;
    });
  }

  previousState() {
    window.history.back();
  }
}
