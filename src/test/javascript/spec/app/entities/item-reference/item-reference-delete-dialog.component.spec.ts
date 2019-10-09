import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ItemReferenceDeleteDialogComponent } from 'app/entities/item-reference/item-reference-delete-dialog.component';
import { ItemReferenceService } from 'app/entities/item-reference/item-reference.service';

describe('Component Tests', () => {
  describe('ItemReference Management Delete Component', () => {
    let comp: ItemReferenceDeleteDialogComponent;
    let fixture: ComponentFixture<ItemReferenceDeleteDialogComponent>;
    let service: ItemReferenceService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ItemReferenceDeleteDialogComponent]
      })
        .overrideTemplate(ItemReferenceDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemReferenceDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemReferenceService);
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
