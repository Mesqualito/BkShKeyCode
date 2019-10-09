import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IPropPosition, PropPosition } from 'app/shared/model/prop-position.model';
import { PropPositionService } from './prop-position.service';

@Component({
  selector: 'jhi-prop-position-update',
  templateUrl: './prop-position-update.component.html'
})
export class PropPositionUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    timestamp: [null, [Validators.required]],
    posValue: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
    description: []
  });

  constructor(protected propPositionService: PropPositionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ propPosition }) => {
      this.updateForm(propPosition);
    });
  }

  updateForm(propPosition: IPropPosition) {
    this.editForm.patchValue({
      id: propPosition.id,
      timestamp: propPosition.timestamp != null ? propPosition.timestamp.format(DATE_TIME_FORMAT) : null,
      posValue: propPosition.posValue,
      description: propPosition.description
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const propPosition = this.createFromForm();
    if (propPosition.id !== undefined) {
      this.subscribeToSaveResponse(this.propPositionService.update(propPosition));
    } else {
      this.subscribeToSaveResponse(this.propPositionService.create(propPosition));
    }
  }

  private createFromForm(): IPropPosition {
    return {
      ...new PropPosition(),
      id: this.editForm.get(['id']).value,
      timestamp:
        this.editForm.get(['timestamp']).value != null ? moment(this.editForm.get(['timestamp']).value, DATE_TIME_FORMAT) : undefined,
      posValue: this.editForm.get(['posValue']).value,
      description: this.editForm.get(['description']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPropPosition>>) {
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
