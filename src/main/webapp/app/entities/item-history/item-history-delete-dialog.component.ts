import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IItemHistory } from 'app/shared/model/item-history.model';
import { ItemHistoryService } from './item-history.service';

@Component({
  selector: 'jhi-item-history-delete-dialog',
  templateUrl: './item-history-delete-dialog.component.html'
})
export class ItemHistoryDeleteDialogComponent {
  itemHistory: IItemHistory;

  constructor(
    protected itemHistoryService: ItemHistoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.itemHistoryService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'itemHistoryListModification',
        content: 'Deleted an itemHistory'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-item-history-delete-popup',
  template: ''
})
export class ItemHistoryDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemHistory }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ItemHistoryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.itemHistory = itemHistory;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/item-history', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/item-history', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
