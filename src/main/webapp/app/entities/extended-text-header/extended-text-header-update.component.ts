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
import { IExtendedTextHeader, ExtendedTextHeader } from 'app/shared/model/extended-text-header.model';
import { ExtendedTextHeaderService } from './extended-text-header.service';
import { IItem } from 'app/shared/model/item.model';
import { ItemService } from 'app/entities/item/item.service';
import { ILanguage } from 'app/shared/model/language.model';
import { LanguageService } from 'app/entities/language/language.service';

@Component({
  selector: 'jhi-extended-text-header-update',
  templateUrl: './extended-text-header-update.component.html'
})
export class ExtendedTextHeaderUpdateComponent implements OnInit {
  isSaving: boolean;

  items: IItem[];

  languages: ILanguage[];

  editForm = this.fb.group({
    id: [],
    timestamp: [null, [Validators.required]],
    tableName: [null, [Validators.required]],
    no: [null, [Validators.required]],
    startingDate: [],
    endingDate: [],
    textNo: [null, [Validators.required]],
    description: [],
    item: [],
    header: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected extendedTextHeaderService: ExtendedTextHeaderService,
    protected itemService: ItemService,
    protected languageService: LanguageService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ extendedTextHeader }) => {
      this.updateForm(extendedTextHeader);
    });
    this.itemService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItem[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItem[]>) => response.body)
      )
      .subscribe((res: IItem[]) => (this.items = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.languageService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILanguage[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILanguage[]>) => response.body)
      )
      .subscribe((res: ILanguage[]) => (this.languages = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(extendedTextHeader: IExtendedTextHeader) {
    this.editForm.patchValue({
      id: extendedTextHeader.id,
      timestamp: extendedTextHeader.timestamp != null ? extendedTextHeader.timestamp.format(DATE_TIME_FORMAT) : null,
      tableName: extendedTextHeader.tableName,
      no: extendedTextHeader.no,
      startingDate: extendedTextHeader.startingDate != null ? extendedTextHeader.startingDate.format(DATE_TIME_FORMAT) : null,
      endingDate: extendedTextHeader.endingDate != null ? extendedTextHeader.endingDate.format(DATE_TIME_FORMAT) : null,
      textNo: extendedTextHeader.textNo,
      description: extendedTextHeader.description,
      item: extendedTextHeader.item,
      header: extendedTextHeader.header
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const extendedTextHeader = this.createFromForm();
    if (extendedTextHeader.id !== undefined) {
      this.subscribeToSaveResponse(this.extendedTextHeaderService.update(extendedTextHeader));
    } else {
      this.subscribeToSaveResponse(this.extendedTextHeaderService.create(extendedTextHeader));
    }
  }

  private createFromForm(): IExtendedTextHeader {
    return {
      ...new ExtendedTextHeader(),
      id: this.editForm.get(['id']).value,
      timestamp:
        this.editForm.get(['timestamp']).value != null ? moment(this.editForm.get(['timestamp']).value, DATE_TIME_FORMAT) : undefined,
      tableName: this.editForm.get(['tableName']).value,
      no: this.editForm.get(['no']).value,
      startingDate:
        this.editForm.get(['startingDate']).value != null ? moment(this.editForm.get(['startingDate']).value, DATE_TIME_FORMAT) : undefined,
      endingDate:
        this.editForm.get(['endingDate']).value != null ? moment(this.editForm.get(['endingDate']).value, DATE_TIME_FORMAT) : undefined,
      textNo: this.editForm.get(['textNo']).value,
      description: this.editForm.get(['description']).value,
      item: this.editForm.get(['item']).value,
      header: this.editForm.get(['header']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExtendedTextHeader>>) {
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

  trackLanguageById(index: number, item: ILanguage) {
    return item.id;
  }
}
