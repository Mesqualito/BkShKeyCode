import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExtendedTextLine } from 'app/shared/model/extended-text-line.model';
import { ExtendedTextLineService } from './extended-text-line.service';

@Component({
  selector: 'jhi-extended-text-line-delete-dialog',
  templateUrl: './extended-text-line-delete-dialog.component.html'
})
export class ExtendedTextLineDeleteDialogComponent {
  extendedTextLine: IExtendedTextLine;

  constructor(
    protected extendedTextLineService: ExtendedTextLineService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.extendedTextLineService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'extendedTextLineListModification',
        content: 'Deleted an extendedTextLine'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-extended-text-line-delete-popup',
  template: ''
})
export class ExtendedTextLineDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ extendedTextLine }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ExtendedTextLineDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.extendedTextLine = extendedTextLine;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/extended-text-line', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/extended-text-line', { outlets: { popup: null } }]);
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
