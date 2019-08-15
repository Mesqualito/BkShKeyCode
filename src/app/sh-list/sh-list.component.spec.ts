import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShListComponent } from './sh-list.component';

describe('ShListComponent', () => {
  let component: ShListComponent;
  let fixture: ComponentFixture<ShListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
