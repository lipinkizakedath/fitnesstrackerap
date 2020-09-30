import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoptrainingComponent } from './stoptraining.component';

describe('StoptrainingComponent', () => {
  let component: StoptrainingComponent;
  let fixture: ComponentFixture<StoptrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoptrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoptrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
