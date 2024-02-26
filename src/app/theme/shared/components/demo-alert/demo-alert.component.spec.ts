import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAlertComponent } from './demo-alert.component';

describe('AlertComponent', () => {
  let component: DemoAlertComponent;
  let fixture: ComponentFixture<DemoAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoAlertComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DemoAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
