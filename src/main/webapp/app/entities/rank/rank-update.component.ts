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
import { IRank, Rank } from 'app/shared/model/rank.model';
import { RankService } from './rank.service';
import { IItemSubstitution } from 'app/shared/model/item-substitution.model';
import { ItemSubstitutionService } from 'app/entities/item-substitution/item-substitution.service';
import { IItemReference } from 'app/shared/model/item-reference.model';
import { ItemReferenceService } from 'app/entities/item-reference/item-reference.service';
import { IItemProperty } from 'app/shared/model/item-property.model';
import { ItemPropertyService } from 'app/entities/item-property/item-property.service';

@Component({
  selector: 'jhi-rank-update',
  templateUrl: './rank-update.component.html'
})
export class RankUpdateComponent implements OnInit {
  isSaving: boolean;

  itemsubstitutions: IItemSubstitution[];

  itemreferences: IItemReference[];

  itemproperties: IItemProperty[];

  editForm = this.fb.group({
    id: [],
    timestamp: [null, [Validators.required]],
    prioValue: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected rankService: RankService,
    protected itemSubstitutionService: ItemSubstitutionService,
    protected itemReferenceService: ItemReferenceService,
    protected itemPropertyService: ItemPropertyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rank }) => {
      this.updateForm(rank);
    });
    this.itemSubstitutionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemSubstitution[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemSubstitution[]>) => response.body)
      )
      .subscribe((res: IItemSubstitution[]) => (this.itemsubstitutions = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.itemReferenceService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemReference[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemReference[]>) => response.body)
      )
      .subscribe((res: IItemReference[]) => (this.itemreferences = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.itemPropertyService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemProperty[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemProperty[]>) => response.body)
      )
      .subscribe((res: IItemProperty[]) => (this.itemproperties = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(rank: IRank) {
    this.editForm.patchValue({
      id: rank.id,
      timestamp: rank.timestamp != null ? rank.timestamp.format(DATE_TIME_FORMAT) : null,
      prioValue: rank.prioValue
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rank = this.createFromForm();
    if (rank.id !== undefined) {
      this.subscribeToSaveResponse(this.rankService.update(rank));
    } else {
      this.subscribeToSaveResponse(this.rankService.create(rank));
    }
  }

  private createFromForm(): IRank {
    return {
      ...new Rank(),
      id: this.editForm.get(['id']).value,
      timestamp:
        this.editForm.get(['timestamp']).value != null ? moment(this.editForm.get(['timestamp']).value, DATE_TIME_FORMAT) : undefined,
      prioValue: this.editForm.get(['prioValue']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRank>>) {
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

  trackItemSubstitutionById(index: number, item: IItemSubstitution) {
    return item.id;
  }

  trackItemReferenceById(index: number, item: IItemReference) {
    return item.id;
  }

  trackItemPropertyById(index: number, item: IItemProperty) {
    return item.id;
  }
}
