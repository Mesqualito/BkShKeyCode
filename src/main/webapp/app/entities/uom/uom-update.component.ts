import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IUom, Uom } from 'app/shared/model/uom.model';
import { UomService } from './uom.service';
import { IItemProperty } from 'app/shared/model/item-property.model';
import { ItemPropertyService } from 'app/entities/item-property/item-property.service';
import { IItem } from 'app/shared/model/item.model';
import { ItemService } from 'app/entities/item/item.service';
import { IItemReference } from 'app/shared/model/item-reference.model';
import { ItemReferenceService } from 'app/entities/item-reference/item-reference.service';

@Component({
  selector: 'jhi-uom-update',
  templateUrl: './uom-update.component.html'
})
export class UomUpdateComponent implements OnInit {
  isSaving: boolean;

  itemproperties: IItemProperty[];

  items: IItem[];

  itemreferences: IItemReference[];

  editForm = this.fb.group({
    id: [],
    timestamp: [null, [Validators.required]],
    modificationDate: [],
    rank: [],
    code: [null, [Validators.required]],
    description: [null, [Validators.required]],
    factor: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected uomService: UomService,
    protected itemPropertyService: ItemPropertyService,
    protected itemService: ItemService,
    protected itemReferenceService: ItemReferenceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ uom }) => {
      this.updateForm(uom);
    });
    this.itemPropertyService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemProperty[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemProperty[]>) => response.body)
      )
      .subscribe((res: IItemProperty[]) => (this.itemproperties = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.itemService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItem[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItem[]>) => response.body)
      )
      .subscribe((res: IItem[]) => (this.items = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.itemReferenceService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemReference[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemReference[]>) => response.body)
      )
      .subscribe((res: IItemReference[]) => (this.itemreferences = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(uom: IUom) {
    this.editForm.patchValue({
      id: uom.id,
      timestamp: uom.timestamp != null ? uom.timestamp.format(DATE_TIME_FORMAT) : null,
      modificationDate: uom.modificationDate != null ? uom.modificationDate.format(DATE_TIME_FORMAT) : null,
      rank: uom.rank,
      code: uom.code,
      description: uom.description,
      factor: uom.factor
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const uom = this.createFromForm();
    if (uom.id !== undefined) {
      this.subscribeToSaveResponse(this.uomService.update(uom));
    } else {
      this.subscribeToSaveResponse(this.uomService.create(uom));
    }
  }

  private createFromForm(): IUom {
    return {
      ...new Uom(),
      id: this.editForm.get(['id']).value,
      timestamp:
        this.editForm.get(['timestamp']).value != null ? moment(this.editForm.get(['timestamp']).value, DATE_TIME_FORMAT) : undefined,
      modificationDate:
        this.editForm.get(['modificationDate']).value != null
          ? moment(this.editForm.get(['modificationDate']).value, DATE_TIME_FORMAT)
          : undefined,
      rank: this.editForm.get(['rank']).value,
      code: this.editForm.get(['code']).value,
      description: this.editForm.get(['description']).value,
      factor: this.editForm.get(['factor']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUom>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackItemPropertyById(index: number, item: IItemProperty) {
    return item.id;
  }

  trackItemById(index: number, item: IItem) {
    return item.id;
  }

  trackItemReferenceById(index: number, item: IItemReference) {
    return item.id;
  }
}
