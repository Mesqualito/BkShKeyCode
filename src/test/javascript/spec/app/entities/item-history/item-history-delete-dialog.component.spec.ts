import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ItemHistoryDeleteDialogComponent } from 'app/entities/item-history/item-history-delete-dialog.component';
import { ItemHistoryService } from 'app/entities/item-history/item-history.service';

describe('Component Tests', () => {
  describe('ItemHistory Management Delete Component', () => {
    let comp: ItemHistoryDeleteDialogComponent;
    let fixture: ComponentFixture<ItemHistoryDeleteDialogComponent>;
    let service: ItemHistoryService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ItemHistoryDeleteDialogComponent]
      })
        .overrideTemplate(ItemHistoryDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemHistoryDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemHistoryService);
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
