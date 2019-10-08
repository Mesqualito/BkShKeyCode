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
import { IItemReference, ItemReference } from 'app/shared/model/item-reference.model';
import { ItemReferenceService } from './item-reference.service';
import { IRank } from 'app/shared/model/rank.model';
import { RankService } from 'app/entities/rank/rank.service';
import { IItem } from 'app/shared/model/item.model';
import { ItemService } from 'app/entities/item/item.service';

@Component({
  selector: 'jhi-item-reference-update',
  templateUrl: './item-reference-update.component.html'
})
export class ItemReferenceUpdateComponent implements OnInit {
  isSaving: boolean;

  references: IRank[];

  items: IItem[];

  editForm = this.fb.group({
    id: [],
    timestamp: [null, [Validators.required]],
    uom: [],
    crossReferenceType: [],
    crossReferenceTypeNo: [],
    crossReferenceNo: [null, [Validators.required]],
    description: [],
    qualifier: [],
    reference: [],
    item: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected itemReferenceService: ItemReferenceService,
    protected rankService: RankService,
    protected itemService: ItemService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ itemReference }) => {
      this.updateForm(itemReference);
    });
    this.rankService
      .query({ filter: 'refrank-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IRank[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRank[]>) => response.body)
      )
      .subscribe(
        (res: IRank[]) => {
          if (!this.editForm.get('reference').value || !this.editForm.get('reference').value.id) {
            this.references = res;
          } else {
            this.rankService
              .find(this.editForm.get('reference').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IRank>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IRank>) => subResponse.body)
              )
              .subscribe(
                (subRes: IRank) => (this.references = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.itemService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItem[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItem[]>) => response.body)
      )
      .subscribe((res: IItem[]) => (this.items = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(itemReference: IItemReference) {
    this.editForm.patchValue({
      id: itemReference.id,
      timestamp: itemReference.timestamp != null ? itemReference.timestamp.format(DATE_TIME_FORMAT) : null,
      uom: itemReference.uom,
      crossReferenceType: itemReference.crossReferenceType,
      crossReferenceTypeNo: itemReference.crossReferenceTypeNo,
      crossReferenceNo: itemReference.crossReferenceNo,
      description: itemReference.description,
      qualifier: itemReference.qualifier,
      reference: itemReference.reference,
      item: itemReference.item
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const itemReference = this.createFromForm();
    if (itemReference.id !== undefined) {
      this.subscribeToSaveResponse(this.itemReferenceService.update(itemReference));
    } else {
      this.subscribeToSaveResponse(this.itemReferenceService.create(itemReference));
    }
  }

  private createFromForm(): IItemReference {
    return {
      ...new ItemReference(),
      id: this.editForm.get(['id']).value,
      timestamp:
        this.editForm.get(['timestamp']).value != null ? moment(this.editForm.get(['timestamp']).value, DATE_TIME_FORMAT) : undefined,
      uom: this.editForm.get(['uom']).value,
      crossReferenceType: this.editForm.get(['crossReferenceType']).value,
      crossReferenceTypeNo: this.editForm.get(['crossReferenceTypeNo']).value,
      crossReferenceNo: this.editForm.get(['crossReferenceNo']).value,
      description: this.editForm.get(['description']).value,
      qualifier: this.editForm.get(['qualifier']).value,
      reference: this.editForm.get(['reference']).value,
      item: this.editForm.get(['item']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemReference>>) {
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

  trackItemById(index: number, item: IItem) {
    return item.id;
  }
}
