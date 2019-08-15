import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateShTypingComponent } from './template-sh-typing.component';

describe('TemplateShTypingComponent', () => {
  let component: TemplateShTypingComponent;
  let fixture: ComponentFixture<TemplateShTypingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateShTypingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateShTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
