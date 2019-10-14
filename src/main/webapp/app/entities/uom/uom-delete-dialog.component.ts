import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUom } from 'app/shared/model/uom.model';
import { UomService } from './uom.service';

@Component({
  selector: 'jhi-uom-delete-dialog',
  templateUrl: './uom-delete-dialog.component.html'
})
export class UomDeleteDialogComponent {
  uom: IUom;

  constructor(protected uomService: UomService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.uomService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'uomListModification',
        content: 'Deleted an uom'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-uom-delete-popup',
  template: ''
})
export class UomDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ uom }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UomDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.uom = uom;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/uom', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/uom', { outlets: { popup: null } }]);
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
