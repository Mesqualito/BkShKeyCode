import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { PropPositionDetailComponent } from 'app/entities/prop-position/prop-position-detail.component';
import { PropPosition } from 'app/shared/model/prop-position.model';

describe('Component Tests', () => {
  describe('PropPosition Management Detail Component', () => {
    let comp: PropPositionDetailComponent;
    let fixture: ComponentFixture<PropPositionDetailComponent>;
    const route = ({ data: of({ propPosition: new PropPosition(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [PropPositionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PropPositionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PropPositionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.propPosition).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
