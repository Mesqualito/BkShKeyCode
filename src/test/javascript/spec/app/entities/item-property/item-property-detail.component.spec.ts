import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ItemPropertyDetailComponent } from 'app/entities/item-property/item-property-detail.component';
import { ItemProperty } from 'app/shared/model/item-property.model';

describe('Component Tests', () => {
  describe('ItemProperty Management Detail Component', () => {
    let comp: ItemPropertyDetailComponent;
    let fixture: ComponentFixture<ItemPropertyDetailComponent>;
    const route = ({ data: of({ itemProperty: new ItemProperty(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ItemPropertyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ItemPropertyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemPropertyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.itemProperty).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
