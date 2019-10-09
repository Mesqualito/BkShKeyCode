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
import { IExtendedTextLine, ExtendedTextLine } from 'app/shared/model/extended-text-line.model';
import { ExtendedTextLineService } from './extended-text-line.service';
import { IExtendedTextHeader } from 'app/shared/model/extended-text-header.model';
import { ExtendedTextHeaderService } from 'app/entities/extended-text-header/extended-text-header.service';

@Component({
  selector: 'jhi-extended-text-line-update',
  templateUrl: './extended-text-line-update.component.html'
})
export class ExtendedTextLineUpdateComponent implements OnInit {
  isSaving: boolean;

  extendedtextheaders: IExtendedTextHeader[];

  editForm = this.fb.group({
    id: [],
    timestamp: [null, [Validators.required]],
    tableName: [null, [Validators.required]],
    no: [null, [Validators.required]],
    textNo: [null, [Validators.required]],
    lineNo: [null, [Validators.required]],
    text: [],
    textline: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected extendedTextLineService: ExtendedTextLineService,
    protected extendedTextHeaderService: ExtendedTextHeaderService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ extendedTextLine }) => {
      this.updateForm(extendedTextLine);
    });
    this.extendedTextHeaderService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IExtendedTextHeader[]>) => mayBeOk.ok),
        map((response: HttpResponse<IExtendedTextHeader[]>) => response.body)
      )
      .subscribe((res: IExtendedTextHeader[]) => (this.extendedtextheaders = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(extendedTextLine: IExtendedTextLine) {
    this.editForm.patchValue({
      id: extendedTextLine.id,
      timestamp: extendedTextLine.timestamp != null ? extendedTextLine.timestamp.format(DATE_TIME_FORMAT) : null,
      tableName: extendedTextLine.tableName,
      no: extendedTextLine.no,
      textNo: extendedTextLine.textNo,
      lineNo: extendedTextLine.lineNo,
      text: extendedTextLine.text,
      textline: extendedTextLine.textline
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const extendedTextLine = this.createFromForm();
    if (extendedTextLine.id !== undefined) {
      this.subscribeToSaveResponse(this.extendedTextLineService.update(extendedTextLine));
    } else {
      this.subscribeToSaveResponse(this.extendedTextLineService.create(extendedTextLine));
    }
  }

  private createFromForm(): IExtendedTextLine {
    return {
      ...new ExtendedTextLine(),
      id: this.editForm.get(['id']).value,
      timestamp:
        this.editForm.get(['timestamp']).value != null ? moment(this.editForm.get(['timestamp']).value, DATE_TIME_FORMAT) : undefined,
      tableName: this.editForm.get(['tableName']).value,
      no: this.editForm.get(['no']).value,
      textNo: this.editForm.get(['textNo']).value,
      lineNo: this.editForm.get(['lineNo']).value,
      text: this.editForm.get(['text']).value,
      textline: this.editForm.get(['textline']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExtendedTextLine>>) {
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

  trackExtendedTextHeaderById(index: number, item: IExtendedTextHeader) {
    return item.id;
  }
}
