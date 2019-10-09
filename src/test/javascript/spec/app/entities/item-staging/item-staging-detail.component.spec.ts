import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BkShKeyCodeTestModule } from '../../../test.module';
import { ItemStagingDetailComponent } from 'app/entities/item-staging/item-staging-detail.component';
import { ItemStaging } from 'app/shared/model/item-staging.model';

describe('Component Tests', () => {
  describe('ItemStaging Management Detail Component', () => {
    let comp: ItemStagingDetailComponent;
    let fixture: ComponentFixture<ItemStagingDetailComponent>;
    const route = ({ data: of({ itemStaging: new ItemStaging(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BkShKeyCodeTestModule],
        declarations: [ItemStagingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ItemStagingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemStagingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.itemStaging).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
