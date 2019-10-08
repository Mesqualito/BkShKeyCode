import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ItemStagingUpdateComponent } from 'app/entities/item-staging/item-staging-update.component';
import { ItemStagingService } from 'app/entities/item-staging/item-staging.service';
import { ItemStaging } from 'app/shared/model/item-staging.model';

describe('Component Tests', () => {
  describe('ItemStaging Management Update Component', () => {
    let comp: ItemStagingUpdateComponent;
    let fixture: ComponentFixture<ItemStagingUpdateComponent>;
    let service: ItemStagingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ItemStagingUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ItemStagingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ItemStagingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemStagingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ItemStaging(123);
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
        const entity = new ItemStaging();
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
