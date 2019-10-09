import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExtendedTextLine } from 'app/shared/model/extended-text-line.model';

@Component({
  selector: 'jhi-extended-text-line-detail',
  templateUrl: './extended-text-line-detail.component.html'
})
export class ExtendedTextLineDetailComponent implements OnInit {
  extendedTextLine: IExtendedTextLine;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ extendedTextLine }) => {
      this.extendedTextLine = extendedTextLine;
    });
  }

  previousState() {
    window.history.back();
  }
}
