import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
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
import { IRank } from 'app/shared/model/rank.model';
import { RankService } from 'app/entities/rank/rank.service';

@Component({
  selector: 'jhi-item-property-update',
  templateUrl: './item-property-update.component.html'
})
export class ItemPropertyUpdateComponent implements OnInit {
  isSaving: boolean;

  itemproperties: IRank[];

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
    protected rankService: RankService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ itemProperty }) => {
      this.updateForm(itemProperty);
    });
    this.rankService
      .query({ filter: 'shcoderank-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IRank[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRank[]>) => response.body)
      )
      .subscribe(
        (res: IRank[]) => {
          if (!this.editForm.get('itemproperty').value || !this.editForm.get('itemproperty').value.id) {
            this.itemproperties = res;
          } else {
            this.rankService
              .find(this.editForm.get('itemproperty').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IRank>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IRank>) => subResponse.body)
              )
              .subscribe(
                (subRes: IRank) => (this.itemproperties = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
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

  trackRankById(index: number, item: IRank) {
    return item.id;
  }
}
