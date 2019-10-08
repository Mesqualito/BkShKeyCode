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
import { IItemSubstitution, ItemSubstitution } from 'app/shared/model/item-substitution.model';
import { ItemSubstitutionService } from './item-substitution.service';
import { IItem } from 'app/shared/model/item.model';
import { ItemService } from 'app/entities/item/item.service';

@Component({
  selector: 'jhi-item-substitution-update',
  templateUrl: './item-substitution-update.component.html'
})
export class ItemSubstitutionUpdateComponent implements OnInit {
  isSaving: boolean;

  items: IItem[];

  editForm = this.fb.group({
    id: [],
    timestamp: [null, [Validators.required]],
    type: [null, [Validators.required]],
    substituteType: [null, [Validators.required]],
    substituteNo: [null, [Validators.required]],
    description: [],
    isInterchangeable: [],
    relationsLevel: [],
    isCheckedToOriginal: [],
    origCheckDate: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected itemSubstitutionService: ItemSubstitutionService,
    protected itemService: ItemService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ itemSubstitution }) => {
      this.updateForm(itemSubstitution);
    });
    this.itemService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItem[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItem[]>) => response.body)
      )
      .subscribe((res: IItem[]) => (this.items = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(itemSubstitution: IItemSubstitution) {
    this.editForm.patchValue({
      id: itemSubstitution.id,
      timestamp: itemSubstitution.timestamp != null ? itemSubstitution.timestamp.format(DATE_TIME_FORMAT) : null,
      type: itemSubstitution.type,
      substituteType: itemSubstitution.substituteType,
      substituteNo: itemSubstitution.substituteNo,
      description: itemSubstitution.description,
      isInterchangeable: itemSubstitution.isInterchangeable,
      relationsLevel: itemSubstitution.relationsLevel,
      isCheckedToOriginal: itemSubstitution.isCheckedToOriginal,
      origCheckDate: itemSubstitution.origCheckDate != null ? itemSubstitution.origCheckDate.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const itemSubstitution = this.createFromForm();
    if (itemSubstitution.id !== undefined) {
      this.subscribeToSaveResponse(this.itemSubstitutionService.update(itemSubstitution));
    } else {
      this.subscribeToSaveResponse(this.itemSubstitutionService.create(itemSubstitution));
    }
  }

  private createFromForm(): IItemSubstitution {
    return {
      ...new ItemSubstitution(),
      id: this.editForm.get(['id']).value,
      timestamp:
        this.editForm.get(['timestamp']).value != null ? moment(this.editForm.get(['timestamp']).value, DATE_TIME_FORMAT) : undefined,
      type: this.editForm.get(['type']).value,
      substituteType: this.editForm.get(['substituteType']).value,
      substituteNo: this.editForm.get(['substituteNo']).value,
      description: this.editForm.get(['description']).value,
      isInterchangeable: this.editForm.get(['isInterchangeable']).value,
      relationsLevel: this.editForm.get(['relationsLevel']).value,
      isCheckedToOriginal: this.editForm.get(['isCheckedToOriginal']).value,
      origCheckDate:
        this.editForm.get(['origCheckDate']).value != null
          ? moment(this.editForm.get(['origCheckDate']).value, DATE_TIME_FORMAT)
          : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemSubstitution>>) {
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

  trackItemById(index: number, item: IItem) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
