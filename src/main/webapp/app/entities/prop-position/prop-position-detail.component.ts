import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPropPosition } from 'app/shared/model/prop-position.model';

@Component({
  selector: 'jhi-prop-position-detail',
  templateUrl: './prop-position-detail.component.html'
})
export class PropPositionDetailComponent implements OnInit {
  propPosition: IPropPosition;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ propPosition }) => {
      this.propPosition = propPosition;
    });
  }

  previousState() {
    window.history.back();
  }
}
