import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPropPosition } from 'app/shared/model/prop-position.model';
import { PropPositionService } from './prop-position.service';

@Component({
  selector: 'jhi-prop-position-delete-dialog',
  templateUrl: './prop-position-delete-dialog.component.html'
})
export class PropPositionDeleteDialogComponent {
  propPosition: IPropPosition;

  constructor(
    protected propPositionService: PropPositionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.propPositionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'propPositionListModification',
        content: 'Deleted an propPosition'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-prop-position-delete-popup',
  template: ''
})
export class PropPositionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ propPosition }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PropPositionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.propPosition = propPosition;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/prop-position', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/prop-position', { outlets: { popup: null } }]);
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
