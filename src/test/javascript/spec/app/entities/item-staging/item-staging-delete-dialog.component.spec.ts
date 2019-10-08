import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ItemStagingDeleteDialogComponent } from 'app/entities/item-staging/item-staging-delete-dialog.component';
import { ItemStagingService } from 'app/entities/item-staging/item-staging.service';

describe('Component Tests', () => {
  describe('ItemStaging Management Delete Component', () => {
    let comp: ItemStagingDeleteDialogComponent;
    let fixture: ComponentFixture<ItemStagingDeleteDialogComponent>;
    let service: ItemStagingService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ItemStagingDeleteDialogComponent]
      })
        .overrideTemplate(ItemStagingDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemStagingDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemStagingService);
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
