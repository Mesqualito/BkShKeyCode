import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Bkencoder, IBkencoder } from 'app/shared/model/bkencoder.model';
import { BkencoderService } from './bkencoder.service';

@Component({
  selector: 'jhi-bkencoder-update',
  templateUrl: './bkencoder-update.component.html'
})
export class BkencoderUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: []
  });

  constructor(protected bkencoderService: BkencoderService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ bkencoder }) => {
      this.updateForm(bkencoder);
    });
  }

  updateForm(bkencoder: IBkencoder) {
    this.editForm.patchValue({
      id: bkencoder.id
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const bkencoder = this.createFromForm();
    if (bkencoder.id !== undefined) {
      this.subscribeToSaveResponse(this.bkencoderService.update(bkencoder));
    } else {
      this.subscribeToSaveResponse(this.bkencoderService.create(bkencoder));
    }
  }

  private createFromForm(): IBkencoder {
    return {
      ...new Bkencoder(),
      id: this.editForm.get(['id']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBkencoder>>) {
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
