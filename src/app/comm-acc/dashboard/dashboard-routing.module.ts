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
        loadComponent: () => import('./dash-analytics/dash-analytics.component'),
          canActivate: [AuthGuard],
          data: {roles: ['CLIENT-VERIFIED']}
      },
      {
        path: 'sale',
        loadComponent: () => import('./dash-sale/dash-sale.component'),
          canActivate: [AuthGuard],
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
