import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ItemSubstitutionDeleteDialogComponent } from 'app/entities/item-substitution/item-substitution-delete-dialog.component';
import { ItemSubstitutionService } from 'app/entities/item-substitution/item-substitution.service';

describe('Component Tests', () => {
  describe('ItemSubstitution Management Delete Component', () => {
    let comp: ItemSubstitutionDeleteDialogComponent;
    let fixture: ComponentFixture<ItemSubstitutionDeleteDialogComponent>;
    let service: ItemSubstitutionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ItemSubstitutionDeleteDialogComponent]
      })
        .overrideTemplate(ItemSubstitutionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemSubstitutionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemSubstitutionService);
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
