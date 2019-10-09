import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { PropPositionUpdateComponent } from 'app/entities/prop-position/prop-position-update.component';
import { PropPositionService } from 'app/entities/prop-position/prop-position.service';
import { PropPosition } from 'app/shared/model/prop-position.model';

describe('Component Tests', () => {
  describe('PropPosition Management Update Component', () => {
    let comp: PropPositionUpdateComponent;
    let fixture: ComponentFixture<PropPositionUpdateComponent>;
    let service: PropPositionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [PropPositionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PropPositionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PropPositionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PropPositionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PropPosition(123);
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
        const entity = new PropPosition();
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
