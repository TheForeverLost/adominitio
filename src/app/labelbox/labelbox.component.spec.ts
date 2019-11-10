import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelboxComponent } from './labelbox.component';

describe('LabelboxComponent', () => {
  let component: LabelboxComponent;
  let fixture: ComponentFixture<LabelboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
