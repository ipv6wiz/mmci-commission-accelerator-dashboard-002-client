// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@angular/fire/auth-guard";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        loadComponent: () => import('./basic-elements/basic-elements.component'),
          canActivate: [AuthGuard],
          data: {roles: ['Client']}
      },
      {
        path: 'advance',
        loadComponent: () => import('./form-advance/form-advance.component'),
          canActivate: [AuthGuard],
          data: {roles: ['Client']}
      },
      {
        path: 'validation',
        loadComponent: () => import('./form-validation/form-validation.component'),
          canActivate: [AuthGuard],
          data: {roles: ['Client']}
      },
      {
        path: 'masking',
        loadComponent: () => import('./form-masking/form-masking.component'),
          canActivate: [AuthGuard],
          data: {roles: ['Client']}
      },
      {
        path: 'picker',
        loadComponent: () => import('./form-picker/form-picker.component'),
          canActivate: [AuthGuard],
          data: {roles: ['Client']}
      },
      {
        path: 'select',
        loadComponent: () => import('./form-select/form-select.component'),
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
export class FormsRoutingModule {}
