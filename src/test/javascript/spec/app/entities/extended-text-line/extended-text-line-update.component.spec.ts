import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ExtendedTextLineUpdateComponent } from 'app/entities/extended-text-line/extended-text-line-update.component';
import { ExtendedTextLineService } from 'app/entities/extended-text-line/extended-text-line.service';
import { ExtendedTextLine } from 'app/shared/model/extended-text-line.model';

describe('Component Tests', () => {
  describe('ExtendedTextLine Management Update Component', () => {
    let comp: ExtendedTextLineUpdateComponent;
    let fixture: ComponentFixture<ExtendedTextLineUpdateComponent>;
    let service: ExtendedTextLineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ExtendedTextLineUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ExtendedTextLineUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExtendedTextLineUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExtendedTextLineService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ExtendedTextLine(123);
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
        const entity = new ExtendedTextLine();
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
