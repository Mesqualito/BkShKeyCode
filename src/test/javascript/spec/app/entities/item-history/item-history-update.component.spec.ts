import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ItemHistoryUpdateComponent } from 'app/entities/item-history/item-history-update.component';
import { ItemHistoryService } from 'app/entities/item-history/item-history.service';
import { ItemHistory } from 'app/shared/model/item-history.model';

describe('Component Tests', () => {
  describe('ItemHistory Management Update Component', () => {
    let comp: ItemHistoryUpdateComponent;
    let fixture: ComponentFixture<ItemHistoryUpdateComponent>;
    let service: ItemHistoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ItemHistoryUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ItemHistoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ItemHistoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemHistoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ItemHistory(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ItemHistory();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
