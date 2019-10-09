import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IItemStaging, ItemStaging } from 'app/shared/model/item-staging.model';
import { ItemStagingService } from './item-staging.service';

@Component({
  selector: 'jhi-item-staging-update',
  templateUrl: './item-staging-update.component.html'
})
export class ItemStagingUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    timestamp: [null, [Validators.required]]
  });

  constructor(protected itemStagingService: ItemStagingService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ itemStaging }) => {
      this.updateForm(itemStaging);
    });
  }

  updateForm(itemStaging: IItemStaging) {
    this.editForm.patchValue({
      id: itemStaging.id,
      timestamp: itemStaging.timestamp != null ? itemStaging.timestamp.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const itemStaging = this.createFromForm();
    if (itemStaging.id !== undefined) {
      this.subscribeToSaveResponse(this.itemStagingService.update(itemStaging));
    } else {
      this.subscribeToSaveResponse(this.itemStagingService.create(itemStaging));
    }
  }

  private createFromForm(): IItemStaging {
    return {
      ...new ItemStaging(),
      id: this.editForm.get(['id']).value,
      timestamp:
        this.editForm.get(['timestamp']).value != null ? moment(this.editForm.get(['timestamp']).value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemStaging>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
