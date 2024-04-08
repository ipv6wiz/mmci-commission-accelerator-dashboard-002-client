// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@angular/fire/auth-guard";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'analytics',
        loadComponent: () => import('./dash-analytics/dash-analytics.component').then(m => m.DashAnalyticsComponent),
          canActivateChild: [AuthGuard],
          data: {roles: ['CLIENT-VERIFIED', 'ADMIN']}
      },
      {
        path: 'sale',
        loadComponent: () => import('./dash-sale/dash-sale.component').then(m => m.DashSaleComponent),
          canActivateChild: [AuthGuard],
          data: {roles: ['CLIENT-VERIFIED']}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
