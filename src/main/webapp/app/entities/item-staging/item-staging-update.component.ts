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
import { IItemStaging, ItemStaging } from 'app/shared/model/item-staging.model';
import { ItemStagingService } from './item-staging.service';
import { IItem } from 'app/shared/model/item.model';
import { ItemService } from 'app/entities/item/item.service';

@Component({
  selector: 'jhi-item-staging-update',
  templateUrl: './item-staging-update.component.html'
})
export class ItemStagingUpdateComponent implements OnInit {
  isSaving: boolean;

  items: IItem[];

  editForm = this.fb.group({
    id: [],
    timestamp: [null, [Validators.required]],
    item: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected itemStagingService: ItemStagingService,
    protected itemService: ItemService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ itemStaging }) => {
      this.updateForm(itemStaging);
    });
    this.itemService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItem[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItem[]>) => response.body)
      )
      .subscribe((res: IItem[]) => (this.items = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(itemStaging: IItemStaging) {
    this.editForm.patchValue({
      id: itemStaging.id,
      timestamp: itemStaging.timestamp != null ? itemStaging.timestamp.format(DATE_TIME_FORMAT) : null,
      item: itemStaging.item
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
        this.editForm.get(['timestamp']).value != null ? moment(this.editForm.get(['timestamp']).value, DATE_TIME_FORMAT) : undefined,
      item: this.editForm.get(['item']).value
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
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackItemById(index: number, item: IItem) {
    return item.id;
  }
}
