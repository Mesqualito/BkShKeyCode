import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILanguage } from 'app/shared/model/language.model';
import { LanguageService } from './language.service';

@Component({
  selector: 'jhi-language-delete-dialog',
  templateUrl: './language-delete-dialog.component.html'
})
export class LanguageDeleteDialogComponent {
  language: ILanguage;

  constructor(protected languageService: LanguageService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.languageService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'languageListModification',
        content: 'Deleted an language'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-language-delete-popup',
  template: ''
})
export class LanguageDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ language }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LanguageDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.language = language;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/language', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/language', { outlets: { popup: null } }]);
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
