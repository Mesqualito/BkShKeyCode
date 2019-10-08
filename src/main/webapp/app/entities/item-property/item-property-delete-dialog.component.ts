import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IItemProperty } from 'app/shared/model/item-property.model';
import { ItemPropertyService } from './item-property.service';

@Component({
  selector: 'jhi-item-property-delete-dialog',
  templateUrl: './item-property-delete-dialog.component.html'
})
export class ItemPropertyDeleteDialogComponent {
  itemProperty: IItemProperty;

  constructor(
    protected itemPropertyService: ItemPropertyService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.itemPropertyService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'itemPropertyListModification',
        content: 'Deleted an itemProperty'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-item-property-delete-popup',
  template: ''
})
export class ItemPropertyDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemProperty }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ItemPropertyDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.itemProperty = itemProperty;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/item-property', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/item-property', { outlets: { popup: null } }]);
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
