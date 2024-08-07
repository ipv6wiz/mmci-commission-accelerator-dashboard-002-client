// angular import
import { Component, effect, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { ProductSaleComponent } from './product-sale/product-sale.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';


import { AdvancesDgComponent } from '../../../theme/shared/components/advances-dg/advances-dg.component';
import { HelpersService } from '../../../theme/shared/service/helpers.service';
import { LedgerService } from '../../../theme/shared/service/ledger.service';
import { AuthenticationService } from '../../../theme/shared/service';

import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { TblCommAdvancesComponent } from '../../table/tbl-comm-advances/tbl-comm-advances.component';
import { AdvanceService } from '../../../theme/shared/service/advance.service';
import { dataGridRefreshSignal } from '../../../theme/shared/signals/data-grid-refresh.signal';
import { dashCardsRefreshSignal } from '../../../theme/shared/signals/dash-cards-refresh.signal';
import { TblLedgerComponent } from '../../table/tbl-ledger/tbl-ledger.component';

@Component({
  selector: 'app-dash-analytics',
  standalone: true,
  imports: [
    CommonModule,
    ProductSaleComponent,
    SharedModule,

    AdvancesDgComponent,
    NgxMaskPipe,
    TblCommAdvancesComponent,
    TblLedgerComponent
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})
export class DashAnalyticsComponent implements OnInit {

  cards: any[] = [];

  balance: number = 0;
  availableCredit: number = 0;
  creditLimit: number = 0;
  summariesObj: any;
  balanceObj: any;
  private currClient: any;
  dataTypeTag: string = 'advanceCards';

  // constructor
  constructor(
    private authService: AuthenticationService,
    private ledgerService: LedgerService,
    private advanceService: AdvanceService,
    public helpers: HelpersService
  ) {
    console.log('DashAnalyticsComponent - constructor');
    this.currClient = this.authService.getLocalClientData();
    effect(() => {
      const dashCardsRefresh = dashCardsRefreshSignal();
      if(dashCardsRefresh.refresh && dashCardsRefresh.dataType === this.dataTypeTag) {
        this.refreshCards().then(() => true);
      }
    });
  }

  async ngOnInit() {
    await this.refreshCards();
  }

  async refreshCards() {
    console.log('=======> refreshCards called');
    this.balanceObj = await this.ledgerService.getClientBalance(this.currClient.uid);
    console.log('>>>>>>> dash analytics - balanceObj: ',  this.balanceObj);
    this.summariesObj = await this.advanceService.loadSummaries(this.currClient.uid);
    console.log('>>>>>>> dash analytics - summariesObj: ',  this.summariesObj);

    this.balance = this.balanceObj.balance;
    this.availableCredit = this.balanceObj.availableCredit;
    this.creditLimit = this.balanceObj.creditLimit;

    this.cards = this.populateCards();
  }

  populateCards(): any[] {
    const cards = [
      {
        background: 'bg-c-blue',
        title: 'Advance Limit',
        icon: 'bi-currency-dollar',
        iconType: 'bi',
        cardLines: [
          {text: 'Available Limit', type: 'currency', value: this.availableCredit},
          {text: 'Advance Limit', type: 'currency', value: this.creditLimit}
        ]
      },
      {
        background: 'bg-c-green',
        title: 'Advances Summary',
        icon: 'bi-tag',
        iconType: 'bi',
        cardLines: [
          {text: 'Approved Amount', type: 'currency', value: this.summariesObj.get('PENDING-CONTRACTS').amountApproved},
          {text: 'Requested Amount', type: 'currency', value: this.summariesObj.get('REQUEST-PENDING').amountRequested}
        ]
      },

    ];

    return cards;
  }

}
