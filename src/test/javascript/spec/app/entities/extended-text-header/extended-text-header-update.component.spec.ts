import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ExtendedTextHeaderUpdateComponent } from 'app/entities/extended-text-header/extended-text-header-update.component';
import { ExtendedTextHeaderService } from 'app/entities/extended-text-header/extended-text-header.service';
import { ExtendedTextHeader } from 'app/shared/model/extended-text-header.model';

describe('Component Tests', () => {
  describe('ExtendedTextHeader Management Update Component', () => {
    let comp: ExtendedTextHeaderUpdateComponent;
    let fixture: ComponentFixture<ExtendedTextHeaderUpdateComponent>;
    let service: ExtendedTextHeaderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ExtendedTextHeaderUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ExtendedTextHeaderUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExtendedTextHeaderUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExtendedTextHeaderService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ExtendedTextHeader(123);
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
        const entity = new ExtendedTextHeader();
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
