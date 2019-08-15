import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateShKeycodeComponent } from './template-sh-keycode.component';

describe('TemplateShKeycodeComponent', () => {
  let component: TemplateShKeycodeComponent;
  let fixture: ComponentFixture<TemplateShKeycodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateShKeycodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateShKeycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
