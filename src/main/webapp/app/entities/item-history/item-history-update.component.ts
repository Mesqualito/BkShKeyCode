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
import { IItemHistory, ItemHistory } from 'app/shared/model/item-history.model';
import { ItemHistoryService } from './item-history.service';
import { IItem } from 'app/shared/model/item.model';
import { ItemService } from 'app/entities/item/item.service';

@Component({
  selector: 'jhi-item-history-update',
  templateUrl: './item-history-update.component.html'
})
export class ItemHistoryUpdateComponent implements OnInit {
  isSaving: boolean;

  items: IItem[];

  editForm = this.fb.group({
    id: [],
    timestamp: [null, [Validators.required]],
    modificationDate: [],
    modified: [],
    item: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected itemHistoryService: ItemHistoryService,
    protected itemService: ItemService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ itemHistory }) => {
      this.updateForm(itemHistory);
    });
    this.itemService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItem[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItem[]>) => response.body)
      )
      .subscribe((res: IItem[]) => (this.items = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(itemHistory: IItemHistory) {
    this.editForm.patchValue({
      id: itemHistory.id,
      timestamp: itemHistory.timestamp != null ? itemHistory.timestamp.format(DATE_TIME_FORMAT) : null,
      modificationDate: itemHistory.modificationDate != null ? itemHistory.modificationDate.format(DATE_TIME_FORMAT) : null,
      modified: itemHistory.modified,
      item: itemHistory.item
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const itemHistory = this.createFromForm();
    if (itemHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.itemHistoryService.update(itemHistory));
    } else {
      this.subscribeToSaveResponse(this.itemHistoryService.create(itemHistory));
    }
  }

  private createFromForm(): IItemHistory {
    return {
      ...new ItemHistory(),
      id: this.editForm.get(['id']).value,
      timestamp:
        this.editForm.get(['timestamp']).value != null ? moment(this.editForm.get(['timestamp']).value, DATE_TIME_FORMAT) : undefined,
      modificationDate:
        this.editForm.get(['modificationDate']).value != null
          ? moment(this.editForm.get(['modificationDate']).value, DATE_TIME_FORMAT)
          : undefined,
      modified: this.editForm.get(['modified']).value,
      item: this.editForm.get(['item']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemHistory>>) {
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
