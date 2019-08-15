import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateShTypingFormComponent } from './template-sh-typing-form.component';

describe('TemplateShTypingFormComponent', () => {
  let component: TemplateShTypingFormComponent;
  let fixture: ComponentFixture<TemplateShTypingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateShTypingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateShTypingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
