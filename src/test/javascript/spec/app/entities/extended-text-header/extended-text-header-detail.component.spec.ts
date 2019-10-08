import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ExtendedTextHeaderDetailComponent } from 'app/entities/extended-text-header/extended-text-header-detail.component';
import { ExtendedTextHeader } from 'app/shared/model/extended-text-header.model';

describe('Component Tests', () => {
  describe('ExtendedTextHeader Management Detail Component', () => {
    let comp: ExtendedTextHeaderDetailComponent;
    let fixture: ComponentFixture<ExtendedTextHeaderDetailComponent>;
    const route = ({ data: of({ extendedTextHeader: new ExtendedTextHeader(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ExtendedTextHeaderDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ExtendedTextHeaderDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExtendedTextHeaderDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.extendedTextHeader).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
