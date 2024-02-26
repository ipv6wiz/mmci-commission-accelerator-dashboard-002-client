import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPendingComponent } from './reg-pending.component';

describe('RegPendingComponent', () => {
  let component: RegPendingComponent;
  let fixture: ComponentFixture<RegPendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegPendingComponent]
    });
    fixture = TestBed.createComponent(RegPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
