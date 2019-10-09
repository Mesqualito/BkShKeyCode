import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ItemPropertyUpdateComponent } from 'app/entities/item-property/item-property-update.component';
import { ItemPropertyService } from 'app/entities/item-property/item-property.service';
import { ItemProperty } from 'app/shared/model/item-property.model';

describe('Component Tests', () => {
  describe('ItemProperty Management Update Component', () => {
    let comp: ItemPropertyUpdateComponent;
    let fixture: ComponentFixture<ItemPropertyUpdateComponent>;
    let service: ItemPropertyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ItemPropertyUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ItemPropertyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ItemPropertyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemPropertyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ItemProperty(123);
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
        const entity = new ItemProperty();
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
