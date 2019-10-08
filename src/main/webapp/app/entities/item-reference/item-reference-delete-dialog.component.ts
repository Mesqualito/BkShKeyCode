import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IItemReference } from 'app/shared/model/item-reference.model';
import { ItemReferenceService } from './item-reference.service';

@Component({
  selector: 'jhi-item-reference-delete-dialog',
  templateUrl: './item-reference-delete-dialog.component.html'
})
export class ItemReferenceDeleteDialogComponent {
  itemReference: IItemReference;

  constructor(
    protected itemReferenceService: ItemReferenceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.itemReferenceService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'itemReferenceListModification',
        content: 'Deleted an itemReference'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-item-reference-delete-popup',
  template: ''
})
export class ItemReferenceDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemReference }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ItemReferenceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.itemReference = itemReference;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/item-reference', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/item-reference', { outlets: { popup: null } }]);
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
