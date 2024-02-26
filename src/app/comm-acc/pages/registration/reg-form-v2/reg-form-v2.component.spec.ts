import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegFormV2Component } from './reg-form-v2.component';

describe('RegFormV2Component', () => {
  let component: RegFormV2Component;
  let fixture: ComponentFixture<RegFormV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegFormV2Component]
    });
    fixture = TestBed.createComponent(RegFormV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
