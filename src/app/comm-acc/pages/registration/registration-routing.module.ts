import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AppSiteConfig} from "../../../app-site-config";
import {AuthGuard} from "../../../theme/shared/_helpers";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'reg-form',
                title: AppSiteConfig.siteName,
                loadComponent: () => import('./reg-form-v2/reg-form-v2.component'),
                canActivate: [AuthGuard],
                data: {roles: ['CLIENT-PENDING-REGISTRATION']}
            },
            {
                path: 'pending-verification',
                title: AppSiteConfig.siteName,
                loadComponent: () => import('./reg-pending/reg-pending.component'),
                canActivate: [AuthGuard],
                data: {roles: ['CLIENT-PENDING-VERIFICATION']}
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegistrationRoutingModule { }
