// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import {AuthGuard} from "./theme/shared/_helpers";
import {AppSiteConfig} from "./app-site-config"

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: '/auth/signin-v2',
      //   pathMatch: 'full',
      //   title: AppSiteConfig.siteName
      // },
      {
        path: 'dashboard',
        loadChildren: () => import('./comm-acc/dashboard/dashboard.module').then((module) => module.DashboardModule),
          canActivate: [AuthGuard],
          data: {roles: ['CLIENT-VERIFIED']}
      },
      {
        path: 'layout',
        loadChildren: () => import('./comm-acc/pages/layout/layout.module').then((module) => module.LayoutModule),
          canActivate: [AuthGuard],
          data: {roles: ['SuperAdmin']}
      },
      {
        path: 'widget',
        loadChildren: () => import('./comm-acc/widget/widget.module').then((module) => module.WidgetModule),
          canActivate: [AuthGuard],
          data: {roles: ['SuperAdmin']}
      },
      {
        path: 'basic',
        loadChildren: () => import('./comm-acc/ui-elements/ui-basic/ui-basic.module').then((module) => module.UiBasicModule),
          canActivate: [AuthGuard],
          data: {roles: ['SuperAdmin']}
      },
      {
        path: 'advance',
        loadChildren: () => import('./comm-acc/ui-elements/ui-advance/ui-advance.module').then((module) => module.UiAdvanceModule),
          canActivate: [AuthGuard],
          data: {roles: ['SuperAdmin']}
      },
      {
        path: 'forms',
        loadChildren: () => import('./comm-acc/forms/forms.module').then((module) => module.FormsModule),
          canActivate: [AuthGuard],
          data: {roles: ['SuperAdmin']}
      },
      {
        path: 'tbl-bootstrap',
        loadChildren: () => import('./comm-acc/table/tbl-bootstrap/tbl-bootstrap.module').then((module) => module.TblBootstrapModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'tbl-datatable',
        loadComponent: () => import('./comm-acc/table/tbl-datatable/tbl-datatable.component'),
          canActivate: [AuthGuard],
          data: {roles: ['SuperAdmin']}
      },
      {
        path: 'charts',
        loadChildren: () => import('./comm-acc/chart-maps/core-chart/core-chart.module').then((module) => module.CoreChartModule),
          canActivate: [AuthGuard],
          data: {roles: ['SuperAdmin']}
      },
      {
        path: 'maps',
        loadChildren: () => import('./comm-acc/chart-maps/core-maps/core-maps.module').then((module) => module.CoreMapsModule),
          canActivate: [AuthGuard],
          data: {roles: ['SuperAdmin']}
      },
      {
        path: 'email',
        loadChildren: () => import('./comm-acc/application/email/email.module').then((module) => module.EmailModule),
          canActivate: [AuthGuard],
          data: {roles: ['SuperAdmin']}
      },
      {
        path: 'task',
        loadChildren: () => import('./comm-acc/application/task/task.module').then((module) => module.TaskModule),
          canActivate: [AuthGuard],
          data: {roles: ['SuperAdmin']}
      },
      {
        path: 'todo',
        loadChildren: () => import('./comm-acc/application/todo/todo.module').then((module) => module.TodoModule),
          canActivate: [AuthGuard],
          data: {roles: ['SuperAdmin']}
      },
      {
        path: 'gallery',
        loadChildren: () => import('./comm-acc/application/gallery/gallery.module').then((module) => module.GalleryModule),
          canActivate: [AuthGuard],
          data: {roles: ['SuperAdmin']}
      },
      {
        path: 'helpdesk',
        loadChildren: () => import('./comm-acc/application/helpdesk/helpdesk.module').then((module) => module.HelpdeskModule),
          canActivate: [AuthGuard],
          data: {roles: ['Client']}
      },
      {
        path: 'editor',
        loadChildren: () => import('./comm-acc/extension/editor/editor.module').then((module) => module.EditorModule),
          canActivate: [AuthGuard],
          data: {roles: ['SuperAdmin']}
      },
      {
        path: 'invoice',
        loadChildren: () => import('./comm-acc/extension/invoice/invoice.module').then((module) => module.InvoiceModule),
          canActivate: [AuthGuard],
          data: {roles: ['SuperAdmin']}
      },
      {
        path: 'full-calendar',
        loadChildren: () =>
          import('./comm-acc/extension/full-event-calendar/full-event-calendar.module').then((module) => module.FullEventCalendarModule),
          canActivate: [AuthGuard],
          data: {roles: ['SuperAdmin']}
      },
      {
        path: 'file-upload',
        loadComponent: () => import('./comm-acc/extension/file-upload/ext-file-upload.component'),
          canActivate: [AuthGuard],
          data: {roles: ['SuperAdmin']}
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./comm-acc/other/sample-page/sample-page.component'),
          canActivate: [AuthGuard],
          data: {roles: ['SuperAdmin']}
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
        {
            path: '',
            redirectTo: '/auth/signin-v2',
            pathMatch: 'full',
            title: AppSiteConfig.siteName
        },
      {
        path: 'auth',
        loadChildren: () => import('./comm-acc/pages/authentication/authentication.module').then((module) => module.AuthenticationModule)
      },
        {
            path: 'reg',
            loadChildren: () => import('./comm-acc/pages/registration/registration.module').then((module) => module.RegistrationModule)
        },
      {
        path: 'maintenance',
        loadChildren: () => import('./comm-acc/pages/maintenance/maintenance.module').then((module) => module.MaintenanceModule)
      },

    ]
  },
    {
        path: '**',
        redirectTo: '/auth/signin-v2',
        pathMatch: 'full',
        title: AppSiteConfig.siteName
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
