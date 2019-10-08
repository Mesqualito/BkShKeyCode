import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ItemReferenceDetailComponent } from 'app/entities/item-reference/item-reference-detail.component';
import { ItemReference } from 'app/shared/model/item-reference.model';

describe('Component Tests', () => {
  describe('ItemReference Management Detail Component', () => {
    let comp: ItemReferenceDetailComponent;
    let fixture: ComponentFixture<ItemReferenceDetailComponent>;
    const route = ({ data: of({ itemReference: new ItemReference(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ItemReferenceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ItemReferenceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemReferenceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.itemReference).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
