import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeclomeComponent } from './weclome.component';

describe('WeclomeComponent', () => {
  let component: WeclomeComponent;
  let fixture: ComponentFixture<WeclomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeclomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeclomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
