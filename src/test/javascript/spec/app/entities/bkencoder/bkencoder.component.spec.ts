import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { BkencoderComponent } from 'app/entities/bkencoder/bkencoder.component';
import { BkencoderService } from 'app/entities/bkencoder/bkencoder.service';
import { Bkencoder } from 'app/shared/model/bkencoder.model';

describe('Component Tests', () => {
  describe('Bkencoder Management Component', () => {
    let comp: BkencoderComponent;
    let fixture: ComponentFixture<BkencoderComponent>;
    let service: BkencoderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [BkencoderComponent],
        providers: []
      })
        .overrideTemplate(BkencoderComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BkencoderComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BkencoderService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Bkencoder(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.bkencoders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
