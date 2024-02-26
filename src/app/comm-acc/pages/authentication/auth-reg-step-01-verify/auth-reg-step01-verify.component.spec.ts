import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegStep01VerifyComponent } from './auth-reg-step01-verify.component';

describe('AuthRegStep01VerifyComponent', () => {
  let component: AuthRegStep01VerifyComponent;
  let fixture: ComponentFixture<AuthRegStep01VerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthRegStep01VerifyComponent]
    });
    fixture = TestBed.createComponent(AuthRegStep01VerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
