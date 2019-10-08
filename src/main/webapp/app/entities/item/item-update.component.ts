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
import { IItem, Item } from 'app/shared/model/item.model';
import { ItemService } from './item.service';
import { IItemSubstitution } from 'app/shared/model/item-substitution.model';
import { ItemSubstitutionService } from 'app/entities/item-substitution/item-substitution.service';

@Component({
  selector: 'jhi-item-update',
  templateUrl: './item-update.component.html'
})
export class ItemUpdateComponent implements OnInit {
  isSaving: boolean;

  itemsubstitutions: IItemSubstitution[];

  editForm = this.fb.group({
    id: [],
    timestamp: [null, [Validators.required]],
    modificationDate: [],
    no: [null, [Validators.required]],
    no2: [],
    name: [],
    buom: [],
    unitPrice: [],
    netWeight: [],
    hsNo: [],
    hsDescription: [],
    hsComment: [],
    isBlocked: [],
    suom: [],
    itemCategoryCode: [],
    productGroupCode: [],
    wsCategory3Code: [],
    isGTIN: [],
    isOnlySpareparts: [],
    isUsedForWebshop: [],
    applicationKind: [],
    strapType: [],
    sealType: [],
    driveType: [],
    strapTensionMax: [],
    strapWidth: [],
    strappingsPerDay: [],
    akkuType: [],
    akkuBrand: [],
    akkuCapacitiy: [],
    akkuVoltage: [],
    sealFixity: [],
    speed: [],
    motors: [],
    strapThicknessMin: [],
    strapThicknessMax: [],
    isInProductFinder: [],
    isFullyAutomaticTension: [],
    isWeldingByButton: [],
    substNos: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected itemService: ItemService,
    protected itemSubstitutionService: ItemSubstitutionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ item }) => {
      this.updateForm(item);
    });
    this.itemSubstitutionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemSubstitution[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemSubstitution[]>) => response.body)
      )
      .subscribe((res: IItemSubstitution[]) => (this.itemsubstitutions = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(item: IItem) {
    this.editForm.patchValue({
      id: item.id,
      timestamp: item.timestamp != null ? item.timestamp.format(DATE_TIME_FORMAT) : null,
      modificationDate: item.modificationDate != null ? item.modificationDate.format(DATE_TIME_FORMAT) : null,
      no: item.no,
      no2: item.no2,
      name: item.name,
      buom: item.buom,
      unitPrice: item.unitPrice,
      netWeight: item.netWeight,
      hsNo: item.hsNo,
      hsDescription: item.hsDescription,
      hsComment: item.hsComment,
      isBlocked: item.isBlocked,
      suom: item.suom,
      itemCategoryCode: item.itemCategoryCode,
      productGroupCode: item.productGroupCode,
      wsCategory3Code: item.wsCategory3Code,
      isGTIN: item.isGTIN,
      isOnlySpareparts: item.isOnlySpareparts,
      isUsedForWebshop: item.isUsedForWebshop,
      applicationKind: item.applicationKind,
      strapType: item.strapType,
      sealType: item.sealType,
      driveType: item.driveType,
      strapTensionMax: item.strapTensionMax,
      strapWidth: item.strapWidth,
      strappingsPerDay: item.strappingsPerDay,
      akkuType: item.akkuType,
      akkuBrand: item.akkuBrand,
      akkuCapacitiy: item.akkuCapacitiy,
      akkuVoltage: item.akkuVoltage,
      sealFixity: item.sealFixity,
      speed: item.speed,
      motors: item.motors,
      strapThicknessMin: item.strapThicknessMin,
      strapThicknessMax: item.strapThicknessMax,
      isInProductFinder: item.isInProductFinder,
      isFullyAutomaticTension: item.isFullyAutomaticTension,
      isWeldingByButton: item.isWeldingByButton,
      substNos: item.substNos
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const item = this.createFromForm();
    if (item.id !== undefined) {
      this.subscribeToSaveResponse(this.itemService.update(item));
    } else {
      this.subscribeToSaveResponse(this.itemService.create(item));
    }
  }

  private createFromForm(): IItem {
    return {
      ...new Item(),
      id: this.editForm.get(['id']).value,
      timestamp:
        this.editForm.get(['timestamp']).value != null ? moment(this.editForm.get(['timestamp']).value, DATE_TIME_FORMAT) : undefined,
      modificationDate:
        this.editForm.get(['modificationDate']).value != null
          ? moment(this.editForm.get(['modificationDate']).value, DATE_TIME_FORMAT)
          : undefined,
      no: this.editForm.get(['no']).value,
      no2: this.editForm.get(['no2']).value,
      name: this.editForm.get(['name']).value,
      buom: this.editForm.get(['buom']).value,
      unitPrice: this.editForm.get(['unitPrice']).value,
      netWeight: this.editForm.get(['netWeight']).value,
      hsNo: this.editForm.get(['hsNo']).value,
      hsDescription: this.editForm.get(['hsDescription']).value,
      hsComment: this.editForm.get(['hsComment']).value,
      isBlocked: this.editForm.get(['isBlocked']).value,
      suom: this.editForm.get(['suom']).value,
      itemCategoryCode: this.editForm.get(['itemCategoryCode']).value,
      productGroupCode: this.editForm.get(['productGroupCode']).value,
      wsCategory3Code: this.editForm.get(['wsCategory3Code']).value,
      isGTIN: this.editForm.get(['isGTIN']).value,
      isOnlySpareparts: this.editForm.get(['isOnlySpareparts']).value,
      isUsedForWebshop: this.editForm.get(['isUsedForWebshop']).value,
      applicationKind: this.editForm.get(['applicationKind']).value,
      strapType: this.editForm.get(['strapType']).value,
      sealType: this.editForm.get(['sealType']).value,
      driveType: this.editForm.get(['driveType']).value,
      strapTensionMax: this.editForm.get(['strapTensionMax']).value,
      strapWidth: this.editForm.get(['strapWidth']).value,
      strappingsPerDay: this.editForm.get(['strappingsPerDay']).value,
      akkuType: this.editForm.get(['akkuType']).value,
      akkuBrand: this.editForm.get(['akkuBrand']).value,
      akkuCapacitiy: this.editForm.get(['akkuCapacitiy']).value,
      akkuVoltage: this.editForm.get(['akkuVoltage']).value,
      sealFixity: this.editForm.get(['sealFixity']).value,
      speed: this.editForm.get(['speed']).value,
      motors: this.editForm.get(['motors']).value,
      strapThicknessMin: this.editForm.get(['strapThicknessMin']).value,
      strapThicknessMax: this.editForm.get(['strapThicknessMax']).value,
      isInProductFinder: this.editForm.get(['isInProductFinder']).value,
      isFullyAutomaticTension: this.editForm.get(['isFullyAutomaticTension']).value,
      isWeldingByButton: this.editForm.get(['isWeldingByButton']).value,
      substNos: this.editForm.get(['substNos']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItem>>) {
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
