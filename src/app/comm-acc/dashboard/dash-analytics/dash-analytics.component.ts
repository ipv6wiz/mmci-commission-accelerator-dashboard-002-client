// angular import
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { ProductSaleComponent } from './product-sale/product-sale.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexLegend,
  ApexFill,
  ApexGrid,
  ApexPlotOptions,
  ApexTooltip,
  ApexMarkers
} from 'ng-apexcharts';
import { AdvancesDgComponent } from '../../../theme/shared/components/advances-dg/advances-dg.component';
import { HelpersService } from '../../../theme/shared/service/helpers.service';
import { LedgerService } from '../../../theme/shared/service/ledger.service';
import { AuthenticationService } from '../../../theme/shared/service';
import { LedgerBalanceDto } from '../../../theme/shared/dtos/ledger-balance.dto';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { TblCommAdvancesComponent } from '../../table/tbl-comm-advances/tbl-comm-advances.component';
import { AdvanceService } from '../../../theme/shared/service/advance.service';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xAxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  fill: ApexFill;
  grid: ApexGrid;
  markers: ApexMarkers;
};

@Component({
  selector: 'app-dash-analytics',
  standalone: true,
  imports: [
    CommonModule,
    ProductSaleComponent,
    SharedModule,
    NgApexchartsModule,
    AdvancesDgComponent,
    NgxMaskPipe,
    TblCommAdvancesComponent
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})
export class DashAnalyticsComponent implements OnInit {
  // public props
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions!: Partial<ChartOptions>;
  chartOptions_1!: Partial<ChartOptions>;
  chartOptions_2!: Partial<ChartOptions>;
  chartOptions_3!: Partial<ChartOptions>;

  cards: any[] = [];

  balance: number = 0;
  availableCredit: number = 0;
  creditLimit: number = 0;
  summariesObj: any;
  balanceObj: any;
  private currClient: any;

  // constructor
  constructor(
    private authService: AuthenticationService,
    private ledgerService: LedgerService,
    private advanceService: AdvanceService,
    public helpers: HelpersService
  ) {
    console.log('DashAnalyticsComponent - constructor');
    this.currClient = this.authService.getLocalClientData();

    this.chartOptions = {
      chart: {
        height: 205,
        type: 'line',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
        curve: 'smooth'
      },
      series: [
        {
          name: 'Arts',
          data: [20, 50, 30, 60, 30, 50]
        },
        {
          name: 'Commerce',
          data: [60, 30, 65, 45, 67, 35]
        }
      ],
      legend: {
        position: 'top'
      },
      xAxis: {
        type: 'datetime',
        categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000'],
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        show: true,
        min: 10,
        max: 70
      },
      colors: ['#73b4ff', '#59e0c5'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          gradientToColors: ['#4099ff', '#2ed8b6'],
          shadeIntensity: 0.5,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
        }
      },
      grid: {
        borderColor: '#cccccc3b'
      }
    };
    this.chartOptions_1 = {
      chart: {
        height: 150,
        type: 'donut'
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%'
          }
        }
      },
      labels: ['New', 'Return'],
      series: [39, 10],
      legend: {
        show: false
      },
      tooltip: {
        theme: 'dark'
      },
      grid: {
        padding: {
          top: 20,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      colors: ['#4680ff', '#2ed8b6'],
      fill: {
        opacity: [1, 1]
      },
      stroke: {
        width: 0
      }
    };
    this.chartOptions_2 = {
      chart: {
        height: 150,
        type: 'donut'
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%'
          }
        }
      },
      labels: ['New', 'Return'],
      series: [20, 15],
      legend: {
        show: false
      },
      tooltip: {
        theme: 'dark'
      },
      grid: {
        padding: {
          top: 20,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      colors: ['#fff', '#2ed8b6'],
      fill: {
        opacity: [1, 1]
      },
      stroke: {
        width: 0
      }
    };
    this.chartOptions_3 = {
      chart: {
        type: 'area',
        height: 145,
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#ff5370'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#ff869a'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 0.8,
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      series: [
        {
          data: [45, 35, 60, 50, 85, 70]
        }
      ],
      yaxis: {
        min: 5,
        max: 90
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        marker: {
          show: false
        }
      }
    };
  }

  async ngOnInit() {
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
        title: 'Credit',
        icon: 'bi-currency-dollar',
        iconType: 'bi',
        cardLines: [
          {text: 'Available Credit', type: 'currency', value: this.availableCredit},
          {text: 'Credit Limit', type: 'currency', value: this.creditLimit}
        ]
      },
      {
        background: 'bg-c-green',
        title: 'Advances Summary',
        icon: 'bi-tag',
        iconType: 'bi',
        cardLines: [
          {text: 'Approved Value', type: 'currency', value: this.summariesObj.get('pending').amountApproved},
          {text: 'Requested Value', type: 'currency', value: this.summariesObj.get('pending').amountRequested}
        ]
      },
      {
        background: 'bg-c-yellow',
        title: `Escrows in next ${this.summariesObj.get('pending').daysEscrowsClosingData} days`,
        icon: 'bi-arrow-repeat',
        iconType: 'bi',
        cardLines: [
          {text: 'Quantity', type: 'text', value: this.summariesObj.get('pending').qtyEscrowsClosing},
          {text: 'Estimated Net', type: 'currency', value: this.summariesObj.get('pending').agentCommision},
        ]
      },
      {
        background: 'bg-c-red',
        title: 'Escrows next month',
        icon: 'bi-repeat',
        iconType: 'bi',
        cardLines: [
          {text: 'Gross', type: 'currency', value: 75000},
          {text: 'Estimated Net', type: 'currency', value: 50000}
        ]
      }
    ];

    return cards;
  }

  images = [
    {
      src: 'assets/images/gallery-grid/img-grd-gal-1.jpg',
      title: 'Old Scooter',
      size: 'PNG-100KB'
    },
    {
      src: 'assets/images/gallery-grid/img-grd-gal-2.jpg',
      title: 'Wall Art',
      size: 'PNG-150KB'
    },
    {
      src: 'assets/images/gallery-grid/img-grd-gal-3.jpg',
      title: 'Microphone',
      size: 'PNG-150KB'
    }
  ];
}
