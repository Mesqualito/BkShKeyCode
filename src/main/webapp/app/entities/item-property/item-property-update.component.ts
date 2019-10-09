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
import { IItemProperty, ItemProperty } from 'app/shared/model/item-property.model';
import { ItemPropertyService } from './item-property.service';
import { IPropPosition } from 'app/shared/model/prop-position.model';
import { PropPositionService } from 'app/entities/prop-position/prop-position.service';

@Component({
  selector: 'jhi-item-property-update',
  templateUrl: './item-property-update.component.html'
})
export class ItemPropertyUpdateComponent implements OnInit {
  isSaving: boolean;

  proppositions: IPropPosition[];

  editForm = this.fb.group({
    id: [],
    timestamp: [null, [Validators.required]],
    modificationDate: [],
    code: [null, [Validators.required]],
    description: [null, [Validators.required]],
    uom: [],
    itemproperty: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected itemPropertyService: ItemPropertyService,
    protected propPositionService: PropPositionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ itemProperty }) => {
      this.updateForm(itemProperty);
    });
    this.propPositionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPropPosition[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPropPosition[]>) => response.body)
      )
      .subscribe((res: IPropPosition[]) => (this.proppositions = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(itemProperty: IItemProperty) {
    this.editForm.patchValue({
      id: itemProperty.id,
      timestamp: itemProperty.timestamp != null ? itemProperty.timestamp.format(DATE_TIME_FORMAT) : null,
      modificationDate: itemProperty.modificationDate != null ? itemProperty.modificationDate.format(DATE_TIME_FORMAT) : null,
      code: itemProperty.code,
      description: itemProperty.description,
      uom: itemProperty.uom,
      itemproperty: itemProperty.itemproperty
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const itemProperty = this.createFromForm();
    if (itemProperty.id !== undefined) {
      this.subscribeToSaveResponse(this.itemPropertyService.update(itemProperty));
    } else {
      this.subscribeToSaveResponse(this.itemPropertyService.create(itemProperty));
    }
  }

  private createFromForm(): IItemProperty {
    return {
      ...new ItemProperty(),
      id: this.editForm.get(['id']).value,
      timestamp:
        this.editForm.get(['timestamp']).value != null ? moment(this.editForm.get(['timestamp']).value, DATE_TIME_FORMAT) : undefined,
      modificationDate:
        this.editForm.get(['modificationDate']).value != null
          ? moment(this.editForm.get(['modificationDate']).value, DATE_TIME_FORMAT)
          : undefined,
      code: this.editForm.get(['code']).value,
      description: this.editForm.get(['description']).value,
      uom: this.editForm.get(['uom']).value,
      itemproperty: this.editForm.get(['itemproperty']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemProperty>>) {
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

  trackPropPositionById(index: number, item: IPropPosition) {
    return item.id;
  }
}
