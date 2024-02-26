// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@angular/fire/auth-guard";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'mail-inbox',
        loadComponent: () => import('./mail-inbox/mail-inbox.component'),
          canActivate: [AuthGuard],
          data: {roles: ['Client']}
      },
      {
        path: 'mail-read',
        loadComponent: () => import('./mail-read/mail-read.component'),
          canActivate: [AuthGuard],
          data: {roles: ['Client']}
      },
      {
        path: 'mail-compose',
        loadComponent: () => import('./mail-compose/mail-compose.component'),
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
export class EmailRoutingModule {}
