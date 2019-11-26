import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { IBkencoder } from 'app/shared/model/bkencoder.model';
import { AccountService } from 'app/core/auth/account.service';
import { BkencoderService } from './bkencoder.service';

@Component({
  selector: 'jhi-bkencoder',
  templateUrl: './bkencoder.component.html',
  styleUrls: ['./bkencoder.component.sass']
})
export class BkencoderComponent implements OnInit, OnDestroy {
  bkencoders: IBkencoder[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected bkencoderService: BkencoderService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.bkencoderService
      .query()
      .pipe(
        filter((res: HttpResponse<IBkencoder[]>) => res.ok),
        map((res: HttpResponse<IBkencoder[]>) => res.body)
      )
      .subscribe(
        (res: IBkencoder[]) => {
          this.bkencoders = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInBkencoders();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBkencoder) {
    return item.id;
  }

  registerChangeInBkencoders() {
    this.eventSubscriber = this.eventManager.subscribe('bkencoderListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
