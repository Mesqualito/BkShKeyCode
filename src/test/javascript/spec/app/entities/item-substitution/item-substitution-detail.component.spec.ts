import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ItemSubstitutionDetailComponent } from 'app/entities/item-substitution/item-substitution-detail.component';
import { ItemSubstitution } from 'app/shared/model/item-substitution.model';

describe('Component Tests', () => {
  describe('ItemSubstitution Management Detail Component', () => {
    let comp: ItemSubstitutionDetailComponent;
    let fixture: ComponentFixture<ItemSubstitutionDetailComponent>;
    const route = ({ data: of({ itemSubstitution: new ItemSubstitution(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ItemSubstitutionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ItemSubstitutionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemSubstitutionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.itemSubstitution).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
