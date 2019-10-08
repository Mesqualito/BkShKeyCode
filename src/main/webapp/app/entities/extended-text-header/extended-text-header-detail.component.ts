import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExtendedTextHeader } from 'app/shared/model/extended-text-header.model';

@Component({
  selector: 'jhi-extended-text-header-detail',
  templateUrl: './extended-text-header-detail.component.html'
})
export class ExtendedTextHeaderDetailComponent implements OnInit {
  extendedTextHeader: IExtendedTextHeader;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ extendedTextHeader }) => {
      this.extendedTextHeader = extendedTextHeader;
    });
  }

  previousState() {
    window.history.back();
  }
}
