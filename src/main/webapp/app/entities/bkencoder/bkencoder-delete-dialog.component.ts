import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBkencoder } from 'app/shared/model/bkencoder.model';
import { BkencoderService } from './bkencoder.service';

@Component({
  selector: 'jhi-bkencoder-delete-dialog',
  templateUrl: './bkencoder-delete-dialog.component.html'
})
export class BkencoderDeleteDialogComponent {
  bkencoder: IBkencoder;

  constructor(protected bkencoderService: BkencoderService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.bkencoderService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'bkencoderListModification',
        content: 'Deleted an bkencoder'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-bkencoder-delete-popup',
  template: ''
})
export class BkencoderDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ bkencoder }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BkencoderDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.bkencoder = bkencoder;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/bkencoder', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/bkencoder', { outlets: { popup: null } }]);
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
