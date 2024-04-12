import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerDgComponent } from './ledger-dg.component';

describe('LedgerDgComponent', () => {
  let component: LedgerDgComponent;
  let fixture: ComponentFixture<LedgerDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerDgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LedgerDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
