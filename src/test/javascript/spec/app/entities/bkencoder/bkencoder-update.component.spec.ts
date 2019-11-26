import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { BkencoderUpdateComponent } from 'app/entities/bkencoder/bkencoder-update.component';
import { BkencoderService } from 'app/entities/bkencoder/bkencoder.service';
import { Bkencoder } from 'app/shared/model/bkencoder.model';

describe('Component Tests', () => {
  describe('Bkencoder Management Update Component', () => {
    let comp: BkencoderUpdateComponent;
    let fixture: ComponentFixture<BkencoderUpdateComponent>;
    let service: BkencoderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [BkencoderUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BkencoderUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BkencoderUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BkencoderService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Bkencoder(123);
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
        const entity = new Bkencoder();
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
