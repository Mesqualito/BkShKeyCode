import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ItemReferenceUpdateComponent } from 'app/entities/item-reference/item-reference-update.component';
import { ItemReferenceService } from 'app/entities/item-reference/item-reference.service';
import { ItemReference } from 'app/shared/model/item-reference.model';

describe('Component Tests', () => {
  describe('ItemReference Management Update Component', () => {
    let comp: ItemReferenceUpdateComponent;
    let fixture: ComponentFixture<ItemReferenceUpdateComponent>;
    let service: ItemReferenceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ItemReferenceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ItemReferenceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ItemReferenceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemReferenceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ItemReference(123);
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
        const entity = new ItemReference();
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
