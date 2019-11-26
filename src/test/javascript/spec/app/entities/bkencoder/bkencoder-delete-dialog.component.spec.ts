import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { BkencoderDeleteDialogComponent } from 'app/entities/bkencoder/bkencoder-delete-dialog.component';
import { BkencoderService } from 'app/entities/bkencoder/bkencoder.service';

describe('Component Tests', () => {
  describe('Bkencoder Management Delete Component', () => {
    let comp: BkencoderDeleteDialogComponent;
    let fixture: ComponentFixture<BkencoderDeleteDialogComponent>;
    let service: BkencoderService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [BkencoderDeleteDialogComponent]
      })
        .overrideTemplate(BkencoderDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BkencoderDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BkencoderService);
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
