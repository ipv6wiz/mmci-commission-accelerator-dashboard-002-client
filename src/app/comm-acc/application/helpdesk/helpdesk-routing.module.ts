// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@angular/fire/auth-guard";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'hd-dashboard',
        loadComponent: () => import('./hd-dashboard/hd-dashboard.component'),
          canActivate: [AuthGuard],
          data: {roles: ['Client']}
      },
      {
        path: 'hd-customer',
        loadComponent: () => import('./hd-customer/hd-customer.component'),
          canActivate: [AuthGuard],
          data: {roles: ['Client']}
      },
      {
        path: 'hd-customer-list',
        loadComponent: () => import('./hd-customer-list/hd-customer-list.component'),
          canActivate: [AuthGuard],
          data: {roles: ['Client']}
      },
      {
        path: 'hd-customer-detail',
        loadComponent: () => import('./hd-customer-detail/hd-customer-detail.component'),
          canActivate: [AuthGuard],
          data: {roles: ['Client']}
      },
      {
        path: 'hd-ticket',
        loadComponent: () => import('./hd-ticket/hd-ticket.component'),
          canActivate: [AuthGuard],
          data: {roles: ['Client']}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpdeskRoutingModule {}
