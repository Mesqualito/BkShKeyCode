import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ExtendedTextLineDetailComponent } from 'app/entities/extended-text-line/extended-text-line-detail.component';
import { ExtendedTextLine } from 'app/shared/model/extended-text-line.model';

describe('Component Tests', () => {
  describe('ExtendedTextLine Management Detail Component', () => {
    let comp: ExtendedTextLineDetailComponent;
    let fixture: ComponentFixture<ExtendedTextLineDetailComponent>;
    const route = ({ data: of({ extendedTextLine: new ExtendedTextLine(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ExtendedTextLineDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ExtendedTextLineDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExtendedTextLineDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.extendedTextLine).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
