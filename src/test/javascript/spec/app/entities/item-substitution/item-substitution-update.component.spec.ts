import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ItemSubstitutionUpdateComponent } from 'app/entities/item-substitution/item-substitution-update.component';
import { ItemSubstitutionService } from 'app/entities/item-substitution/item-substitution.service';
import { ItemSubstitution } from 'app/shared/model/item-substitution.model';

describe('Component Tests', () => {
  describe('ItemSubstitution Management Update Component', () => {
    let comp: ItemSubstitutionUpdateComponent;
    let fixture: ComponentFixture<ItemSubstitutionUpdateComponent>;
    let service: ItemSubstitutionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ItemSubstitutionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ItemSubstitutionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ItemSubstitutionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemSubstitutionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ItemSubstitution(123);
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
        const entity = new ItemSubstitution();
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
