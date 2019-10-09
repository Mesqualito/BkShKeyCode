import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IItemSubstitution } from 'app/shared/model/item-substitution.model';
import { ItemSubstitutionService } from './item-substitution.service';

@Component({
  selector: 'jhi-item-substitution-delete-dialog',
  templateUrl: './item-substitution-delete-dialog.component.html'
})
export class ItemSubstitutionDeleteDialogComponent {
  itemSubstitution: IItemSubstitution;

  constructor(
    protected itemSubstitutionService: ItemSubstitutionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.itemSubstitutionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'itemSubstitutionListModification',
        content: 'Deleted an itemSubstitution'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-item-substitution-delete-popup',
  template: ''
})
export class ItemSubstitutionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemSubstitution }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ItemSubstitutionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.itemSubstitution = itemSubstitution;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/item-substitution', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/item-substitution', { outlets: { popup: null } }]);
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
