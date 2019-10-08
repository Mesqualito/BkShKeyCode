import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ILanguage, Language } from 'app/shared/model/language.model';
import { LanguageService } from './language.service';

@Component({
  selector: 'jhi-language-update',
  templateUrl: './language-update.component.html'
})
export class LanguageUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    timestamp: [null, [Validators.required]],
    code: [null, [Validators.required]],
    name: [null, [Validators.required]],
    iso3166Alpha2: [null, [Validators.required, Validators.maxLength(2)]],
    iso3166Alpha3: [null, [Validators.maxLength(3)]]
  });

  constructor(protected languageService: LanguageService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ language }) => {
      this.updateForm(language);
    });
  }

  updateForm(language: ILanguage) {
    this.editForm.patchValue({
      id: language.id,
      timestamp: language.timestamp != null ? language.timestamp.format(DATE_TIME_FORMAT) : null,
      code: language.code,
      name: language.name,
      iso3166Alpha2: language.iso3166Alpha2,
      iso3166Alpha3: language.iso3166Alpha3
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const language = this.createFromForm();
    if (language.id !== undefined) {
      this.subscribeToSaveResponse(this.languageService.update(language));
    } else {
      this.subscribeToSaveResponse(this.languageService.create(language));
    }
  }

  private createFromForm(): ILanguage {
    return {
      ...new Language(),
      id: this.editForm.get(['id']).value,
      timestamp:
        this.editForm.get(['timestamp']).value != null ? moment(this.editForm.get(['timestamp']).value, DATE_TIME_FORMAT) : undefined,
      code: this.editForm.get(['code']).value,
      name: this.editForm.get(['name']).value,
      iso3166Alpha2: this.editForm.get(['iso3166Alpha2']).value,
      iso3166Alpha3: this.editForm.get(['iso3166Alpha3']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILanguage>>) {
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
