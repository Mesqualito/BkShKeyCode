import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ItemHistoryDetailComponent } from 'app/entities/item-history/item-history-detail.component';
import { ItemHistory } from 'app/shared/model/item-history.model';

describe('Component Tests', () => {
  describe('ItemHistory Management Detail Component', () => {
    let comp: ItemHistoryDetailComponent;
    let fixture: ComponentFixture<ItemHistoryDetailComponent>;
    const route = ({ data: of({ itemHistory: new ItemHistory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ItemHistoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ItemHistoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemHistoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.itemHistory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
