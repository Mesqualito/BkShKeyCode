import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { BkencoderDetailComponent } from 'app/entities/bkencoder/bkencoder-detail.component';
import { Bkencoder } from 'app/shared/model/bkencoder.model';

describe('Component Tests', () => {
  describe('Bkencoder Management Detail Component', () => {
    let comp: BkencoderDetailComponent;
    let fixture: ComponentFixture<BkencoderDetailComponent>;
    const route = ({ data: of({ bkencoder: new Bkencoder(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [BkencoderDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BkencoderDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BkencoderDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bkencoder).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
