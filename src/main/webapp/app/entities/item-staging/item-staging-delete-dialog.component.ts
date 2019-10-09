import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IItemStaging } from 'app/shared/model/item-staging.model';
import { ItemStagingService } from './item-staging.service';

@Component({
  selector: 'jhi-item-staging-delete-dialog',
  templateUrl: './item-staging-delete-dialog.component.html'
})
export class ItemStagingDeleteDialogComponent {
  itemStaging: IItemStaging;

  constructor(
    protected itemStagingService: ItemStagingService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.itemStagingService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'itemStagingListModification',
        content: 'Deleted an itemStaging'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-item-staging-delete-popup',
  template: ''
})
export class ItemStagingDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemStaging }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ItemStagingDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.itemStaging = itemStaging;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/item-staging', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/item-staging', { outlets: { popup: null } }]);
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
