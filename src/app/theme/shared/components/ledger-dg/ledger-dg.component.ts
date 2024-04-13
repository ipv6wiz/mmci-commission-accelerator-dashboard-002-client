import { AfterViewChecked, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NestedColumnPipe } from '../../pipes/nested-column.pipe';
import { MatBoolDisplayPipe } from '../../pipes/mat-bool-display.pipe';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { ListWithCountDto } from '../../dtos/list-with-count.dto';
import { MatDialog } from '@angular/material/dialog';
import { HelpersService } from '../../service/helpers.service';
import { LedgerItemDto } from '../../dtos/ledger-item.dto';
import { LedgerDto } from '../../dtos/ledger.dto';
import { NgStyle } from '@angular/common';
import { IsNegativePipe } from '../../pipes/isNegative.pipe';
import { AdvanceService } from '../../service/advance.service';

@Component({
  selector: 'app-ledger-dg',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatTableModule,
    MatPaginatorModule,
    MatTooltip,
    MatIconButton,
    NgxMaskPipe,
    NestedColumnPipe,
    MatBoolDisplayPipe,
    NgStyle,
    IsNegativePipe
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './ledger-dg.component.html',
  styleUrl: './ledger-dg.component.scss'
})
export class LedgerDgComponent implements OnInit, AfterViewChecked {
  @ViewChild('paginator') paginator!: MatPaginator;
  @Input() loadingItems: boolean = true;
  @Input() dgDataObj!: ListWithCountDto;
  @Input() clientId!: string;

  componentName: string = 'LedgerDgComponent';
  tableTitle: string = 'Your Ledger';
  tableItemName: string ='Transaction';
  dataSource!: MatTableDataSource<LedgerItemDto>;
  totalItemsCount: number = 0;
  columnsToDisplay: string[] = [
    'transactionDate',
    'advanceName',
    'type',
    'amount',
    'balance'
  ];
  columnsToDisplayWithActions: string[] = [...this.columnsToDisplay];
  columnNamesToDisplay: string[] = [
    'Date',
    'Advance',
    'Type',
    'Amount',
    'Balance'
  ];
  columnsConfig: Map<string, any> = new Map<string, any>([
    ['amount', {type: 'currency', mask: 'separator', thousandSeparator: ',', prefix: '$'}],
    ['balance', {type: 'currency', mask: 'separator', thousandSeparator: ',', prefix: '$'}]
  ]);

  advanceNames: Map<string, string> = new Map();

  constructor(
    public modal: MatDialog,
    public helpers: HelpersService,
    private advanceService: AdvanceService
  ) {}

  async ngOnInit() {
    console.log(`${this.componentName} - ngOnInit - clientId: `, this.clientId);
    this.advanceNames = await this.advanceService.loadAdvanceNames(this.clientId);
    console.log(`${this.componentName} - ngOnInit - advanceNames: `, this.advanceNames);
    await this.refreshItemsList();
  }

  ngAfterViewChecked() {
    if(this.dataSource && ( !this.loadingItems && !this.dataSource.paginator)) {
      this.dataSource.paginator = this.paginator;
    }
  }

  async refreshItemsList() {
    this.loadingItems = true;
    if(this.dgDataObj) {
      const ledgerItemsObj: LedgerDto = this.dgDataObj.items[0];
      console.log(`${this.componentName} - refreshItemsList - ledgerItemsObj: `, ledgerItemsObj);
      if(ledgerItemsObj) {
        this.totalItemsCount = ledgerItemsObj.ledgerItems.length;
        const items = this.calcBalanceAndJoinAdvance(ledgerItemsObj.ledgerItems)
        this.dataSource = new MatTableDataSource<LedgerItemDto>(items);
        this.loadingItems = false;
      }
    }
  }

  calcBalanceAndJoinAdvance(items: LedgerItemDto[]): LedgerItemDto[] {
    let balance: number = 0;
    for(let i = items.length - 1; i >= 0; i--) {
        balance += items[i].amount;
        items[i].balance = balance;
        items[i].advanceName = this.advanceNames.get(items[i].advanceId) || 'N/A';
    }
    return items;
  }

}
