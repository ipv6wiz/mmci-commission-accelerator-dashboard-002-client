import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblLedgerComponent } from './tbl-ledger.component';

describe('TblLedgerComponent', () => {
  let component: TblLedgerComponent;
  let fixture: ComponentFixture<TblLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblLedgerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TblLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
