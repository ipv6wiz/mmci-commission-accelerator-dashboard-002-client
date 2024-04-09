import { AfterViewChecked, Component, effect, Input, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatToolbar } from '@angular/material/toolbar';
import { MatPaginator } from '@angular/material/paginator';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NestedColumnPipe } from '../../pipes/nested-column.pipe';
import { ThemePalette } from '@angular/material/core';
import { AdvanceEntity } from '../../entities/advance.entity';
import { MatDialog } from '@angular/material/dialog';
import { dataGridRefreshSignal } from '../../signals/data-grid-refresh.signal';
import { ListWithCountDto } from '../../dtos/list-with-count.dto';
import { AdvanceService } from '../../service/advance.service';
import { AdvanceRequestFormDialogComponent } from './advance-request-form-dialog/advance-request-form-dialog.component';
import { AuthenticationService } from '../../service';
import { HelpersService } from '../../service/helpers.service';
import { MatBoolDisplayPipe } from '../../pipes/mat-bool-display.pipe';
import { ClientService } from '../../service/client.service';
import { EscrowCompanyDto } from '../../dtos/escrow-company.dto';
import { MlsListDto } from '../../dtos/mls-list.dto';

@Component({
  selector: 'app-advances-dg',
  standalone: true,
  imports: [
    CardComponent,
    MatProgressSpinner,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatTooltip,
    MatToolbar,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatPaginator,
    NgxMaskPipe,
    NestedColumnPipe,
    MatBoolDisplayPipe
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './advances-dg.component.html',
  styleUrl: './advances-dg.component.scss'
})
export class AdvancesDgComponent implements OnInit, AfterViewChecked{
  @ViewChild('paginator') paginator!: MatPaginator;
  @Input() advanceStatus!: string; // pending, current, paid, cleared, rejected
  @Input() escrow!: EscrowCompanyDto[];
  @Input() mls!: MlsListDto[];
  @Input() loadingItems: boolean = true;
  @Input() advanceObj!: ListWithCountDto;
  /*
    pending: Request has been made but not yet approved
    current: Request approved
    paid: Request approved and paid to Client
    cleared: Escrow closed remainder of commission less the fee has been paid
    rejected: Request rejected and reason provided
   */

  public loadSpinnerColor: ThemePalette = 'primary';
  public loadSpinnerMode: ProgressSpinnerMode = 'indeterminate';
  public loadSpinnerDiameter: string = '50';
  tableTitle: string = 'Commission Advances';
  tableItemName: string = 'Commission Advance';
  dataSource!: MatTableDataSource<AdvanceEntity>;
  dataTypeTag: string = 'advances';
  totalItemsCount: number = 0;
  columnsToDisplay: string[] = [
    'advanceStatus',
    'propertyAddress.Address1',
    'mlsId',
    'mlsSystem',
    'amountRequested',
    'dateRequested',
    'amountApproved',
    'estimatedClosingDate'
  ];
  columnsToDisplayWithActions: string[] = [...this.columnsToDisplay];
  columnNamesToDisplay: string[] = ['Status','Property', 'MLS #', 'MLS System', 'Requested', 'Date Requested', 'Approved', 'Est Closing'];
  columnsConfig: Map<string, any> = new Map<string, any>([
    ['amountRequested', {type: 'currency', mask: 'separator', thousandSeparator: ',', prefix: '$'}],
    ['amountApproved', {type: 'currency', mask: 'separator', thousandSeparator: ',', prefix: '$'}]
  ]);



  constructor(
    public modal: MatDialog,
    public helpers: HelpersService,
    private authService: AuthenticationService,
    private clientService: ClientService,
    private service: AdvanceService
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
    console.log('ngOnInit - client: ', this.clientService.getOne(this.getClientId()));
    await this.refreshItemsList();
  }

  async ngAfterViewChecked() {
    console.log('AdvancesDgComponent - ngAfterViewChecked - entered');
    if(this.dataSource && ( !this.loadingItems && !this.dataSource.paginator)) {
      console.log('AdvancesDgComponent - ngAfterViewChecked - loading paginator & data');
      this.dataSource.paginator = this.paginator;

    }
  }

  async refreshItemsList(sortBy: string = 'dateRequested', filter: string = '') {
    console.log('AdvancesDgComponent - refreshItemsList - entered');
    this.loadingItems = true;
    // while(this.loadingItems) {
      if(this.advanceObj) {
        this.totalItemsCount = this.advanceObj.count;
        this.dataSource = new MatTableDataSource<AdvanceEntity>(this.advanceObj.items);
        console.log('AdvancesDgComponent - refreshItemsList - items: ', this.advanceObj.items);
        console.log('AdvancesDgComponent - refreshItemsList - count: ', this.advanceObj.count);
        this.loadingItems = false;
      }
    // }

    console.log('AdvancesDgComponent - refreshItemsList - EXIT');
  }

  async loadItemsData(sortBy: string = 'dateRequested', filter: string = ''): Promise<ListWithCountDto> {
    if(this.advanceObj) {
      return this.advanceObj;
    } else {
      return {items: [], count: 0}
    }

    // const clientId: string = this.getClientId();
    // console.log('loadItemsData - client: ', this.clientService.getOne(clientId));
    // if(filter.indexOf(':') === -1) {
    //   filter = `advanceStatus:==:${this.advanceStatus}`;
    // }
    // return  await this.service.loadAllItemsForClientFiltered(clientId, sortBy, filter);
  }

  getClientId(): string {
    const clientData: any = this.authService.getLocalClientData();
    return clientData.uid;
  }

  openItemUpdateFormModal(item: AdvanceEntity, index: number) {
    this.modal.open(AdvanceRequestFormDialogComponent, {
      data: {
        type: 'update',
        escrow: this.escrow,
        mls: this.mls,
        item,
        index
      }
    });
  }

  openItemCreateFormModal() {
    this.modal.open(AdvanceRequestFormDialogComponent, {
      data: {
        type: 'new',
        escrow: this.escrow,
        mls: this.mls,
      }
    });
  }

  addItem() {
    this.openItemCreateFormModal();
  }

  editItem(event: any, item: AdvanceEntity) {
    const index: number = this.dataSource.data.findIndex((advItem: AdvanceEntity) => item.uid === advItem.uid);
    this.openItemUpdateFormModal(item, index);
  }

  onPageEvent(event: any) {
    console.log('onPageEvent - event: ', event);
    console.log('onPageEvent - dataSource - paginator: ', this.dataSource.paginator)
  }

}
