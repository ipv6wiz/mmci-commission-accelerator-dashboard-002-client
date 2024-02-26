// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppSiteConfig} from "../../../app-site-config"
import {AuthGuard} from "../../../theme/shared/_helpers";

const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'verify-email-address',
            title: AppSiteConfig.siteName,
            loadComponent: () => import('./verify-email/verify-email.component'),
            data: {roles: ['CLIENT-PENDING-REGISTRATION']}
        },
        {
            path: 'reg-form-step-01-verify',
            title: AppSiteConfig.siteName,
            loadComponent: () => import('./auth-reg-step-01-verify/auth-reg-step01-verify.component'),
            data: {roles: ['CLIENT-PENDING']}
        },
      {
        path: 'signin-v2',
        title: AppSiteConfig.siteName,
        loadComponent: () => import('./auth-signin-v2/auth-signin-v2.component'),
        data: {roles: ['Client']}
      },
        {
            path: 'signup-v2',
            loadComponent: () => import('./auth-signup-v2/auth-signup-v2.component'),
            data: {roles: ['Guest']}
        },
      {
        path: 'reset-password-v2',
        title: AppSiteConfig.siteName,
        loadComponent: () => import('./auth-reset-password-v2/auth-reset-password-v2.component'),
          data: {roles: ['Client']}
      },
      {
        path: 'change-password-v2',
          title: AppSiteConfig.siteName,
        loadComponent: () => import('./auth-change-password-v2/auth-change-password-v2.component'),
          canActivate: [AuthGuard],
          data: {roles: ['Client']}
      },
      {
        path: 'personal-information',
          title: AppSiteConfig.siteName,
        loadComponent: () => import('./auth-personal-info/auth-personal-info.component'),
          canActivate: [AuthGuard],
          data: {roles: ['Client']}
      },
      {
        path: 'profile-settings',
          title: AppSiteConfig.siteName,
        loadComponent: () => import('./auth-profile-settings/auth-profile-settings.component'),
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
export class AuthenticationRoutingModule {}
