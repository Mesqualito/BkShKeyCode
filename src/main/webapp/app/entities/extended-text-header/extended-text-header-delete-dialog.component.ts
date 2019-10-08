import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExtendedTextHeader } from 'app/shared/model/extended-text-header.model';
import { ExtendedTextHeaderService } from './extended-text-header.service';

@Component({
  selector: 'jhi-extended-text-header-delete-dialog',
  templateUrl: './extended-text-header-delete-dialog.component.html'
})
export class ExtendedTextHeaderDeleteDialogComponent {
  extendedTextHeader: IExtendedTextHeader;

  constructor(
    protected extendedTextHeaderService: ExtendedTextHeaderService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.extendedTextHeaderService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'extendedTextHeaderListModification',
        content: 'Deleted an extendedTextHeader'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-extended-text-header-delete-popup',
  template: ''
})
export class ExtendedTextHeaderDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ extendedTextHeader }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ExtendedTextHeaderDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.extendedTextHeader = extendedTextHeader;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/extended-text-header', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/extended-text-header', { outlets: { popup: null } }]);
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
