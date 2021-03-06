import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ItemPropertyDeleteDialogComponent } from 'app/entities/item-property/item-property-delete-dialog.component';
import { ItemPropertyService } from 'app/entities/item-property/item-property.service';

describe('Component Tests', () => {
  describe('ItemProperty Management Delete Component', () => {
    let comp: ItemPropertyDeleteDialogComponent;
    let fixture: ComponentFixture<ItemPropertyDeleteDialogComponent>;
    let service: ItemPropertyService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ItemPropertyDeleteDialogComponent]
      })
        .overrideTemplate(ItemPropertyDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemPropertyDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemPropertyService);
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
