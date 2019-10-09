import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ExtendedTextLineDeleteDialogComponent } from 'app/entities/extended-text-line/extended-text-line-delete-dialog.component';
import { ExtendedTextLineService } from 'app/entities/extended-text-line/extended-text-line.service';

describe('Component Tests', () => {
  describe('ExtendedTextLine Management Delete Component', () => {
    let comp: ExtendedTextLineDeleteDialogComponent;
    let fixture: ComponentFixture<ExtendedTextLineDeleteDialogComponent>;
    let service: ExtendedTextLineService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ExtendedTextLineDeleteDialogComponent]
      })
        .overrideTemplate(ExtendedTextLineDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExtendedTextLineDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExtendedTextLineService);
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
