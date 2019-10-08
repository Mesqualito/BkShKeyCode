import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ExtendedTextHeaderDeleteDialogComponent } from 'app/entities/extended-text-header/extended-text-header-delete-dialog.component';
import { ExtendedTextHeaderService } from 'app/entities/extended-text-header/extended-text-header.service';

describe('Component Tests', () => {
  describe('ExtendedTextHeader Management Delete Component', () => {
    let comp: ExtendedTextHeaderDeleteDialogComponent;
    let fixture: ComponentFixture<ExtendedTextHeaderDeleteDialogComponent>;
    let service: ExtendedTextHeaderService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ExtendedTextHeaderDeleteDialogComponent]
      })
        .overrideTemplate(ExtendedTextHeaderDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExtendedTextHeaderDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExtendedTextHeaderService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
