import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { UomDeleteDialogComponent } from 'app/entities/uom/uom-delete-dialog.component';
import { UomService } from 'app/entities/uom/uom.service';

describe('Component Tests', () => {
  describe('Uom Management Delete Component', () => {
    let comp: UomDeleteDialogComponent;
    let fixture: ComponentFixture<UomDeleteDialogComponent>;
    let service: UomService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [UomDeleteDialogComponent]
      })
        .overrideTemplate(UomDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UomDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UomService);
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
