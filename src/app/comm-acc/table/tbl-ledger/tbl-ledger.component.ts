import { Component, effect, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatToolbar } from '@angular/material/toolbar';
import { LedgerDgComponent } from '../../../theme/shared/components/ledger-dg/ledger-dg.component';
import { ListWithCountDto } from '../../../theme/shared/dtos/list-with-count.dto';
import { ThemePalette } from '@angular/material/core';
import { AuthenticationService } from '../../../theme/shared/service';
import { HelpersService } from '../../../theme/shared/service/helpers.service';
import { LedgerService } from '../../../theme/shared/service/ledger.service';
import { dataGridRefreshSignal } from '../../../theme/shared/signals/data-grid-refresh.signal';
import { LedgerItemDto } from '../../../theme/shared/dtos/ledger-item.dto';
import { LedgerDto } from '../../../theme/shared/dtos/ledger.dto';

@Component({
  selector: 'app-tbl-ledger',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatProgressSpinner,
    MatToolbar,
    LedgerDgComponent
  ],
  templateUrl: './tbl-ledger.component.html',
  styleUrl: './tbl-ledger.component.scss'
})
export class TblLedgerComponent implements OnInit {
  loadingItems: boolean = true;
  ledgerItemsObj!: LedgerDto;

  public loadSpinnerColor: ThemePalette = 'primary';
  public loadSpinnerMode: ProgressSpinnerMode = 'indeterminate';
  public loadSpinnerDiameter: string = '50';

  tableTitle: string = 'Ledger';
  tableItemName: string = 'Ledger Transaction';
  dataTypeTag: string = 'ledger';

  constructor(
    private authService: AuthenticationService,
    public helpers: HelpersService,
    private service: LedgerService
    ) {
        effect(() => {
          console.log('dataGridRefreshSignal - effect entered');
          const dgrs = dataGridRefreshSignal();
          if(dgrs.refresh && dgrs.dataType === this.dataTypeTag) {
            this.refreshItemsList().then(() => true);
          }
        });
     }

  async ngOnInit() {
    await this.refreshItemsList().then(() => {
      console.log('TblLedgerComponent - ngOnInit - refreshItemsList - done')
    });
  }

  // getLedgerItems(): LedgerItemDto[] {
  //   return this.ledgerItemsObj.items[0].ledgerItems;
  // }

  async refreshItemsList(sortBy: string = 'transactionDate', filter: string = '') {
    this.loadingItems = true;
    this.ledgerItemsObj = await this.loadItemsData(sortBy);
    this.loadingItems = false;
  }

  async loadItemsData(sortBy: string = 'dateRequested'): Promise<LedgerDto> {
    const clientId: string = this.getClientId();
    return  await this.service.getClientLedger(clientId);
  }

  getClientId(): string {
    const clientData: any = this.authService.getLocalClientData();
    return clientData.uid;
  }

}
