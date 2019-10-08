import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRank } from 'app/shared/model/rank.model';
import { RankService } from './rank.service';

@Component({
  selector: 'jhi-rank-delete-dialog',
  templateUrl: './rank-delete-dialog.component.html'
})
export class RankDeleteDialogComponent {
  rank: IRank;

  constructor(protected rankService: RankService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.rankService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'rankListModification',
        content: 'Deleted an rank'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-rank-delete-popup',
  template: ''
})
export class RankDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rank }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RankDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.rank = rank;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/rank', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/rank', { outlets: { popup: null } }]);
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
