import { Injectable } from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, UrlSegmentGroup} from '@angular/router';

import { AuthenticationService } from '../service';
import {Observable} from "rxjs";
import {JwtService} from "../service/jwt.service";
import { AlertService } from '../service/alert.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(
      private router: Router,
      private authService: AuthenticationService,
      private jwtService: JwtService,
      private alertService: AlertService
      ) {}

    async canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
      return this.canActivate(route, state);
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // this.getRoutes();
        let okRole: boolean = false;
        console.log('---->>>>> canActivate called');
        console.log('---->>>>> canActivate - route: ', route);
        if (!this.authService.isLoggedIn()) {
            console.log('canActivate - NOT logged in');
            await this.router.navigate(['/auth/signin-v2'], {queryParams: {returnUrl: state.url}});
            return false;
        } else {
            const clientData = this.authService.getLocalClientData();
            const localToken = this.authService.getLocalIdToken();
            if(!localToken || (localToken &&  this.jwtService.isExpired(localToken))) {
                console.log('----> Token Expired');
                this.alertService.error('Token Expired: Please Login');
                await this.authService.logoutViaApi();
                return false;
            } else {
                if(clientData) {
                    const roles = await this.authService.getCurrentClientRoles(clientData.uid);
                    console.log('User Roles: ', roles);
                    console.log('Page roles: ', route.data['roles']);
                    okRole = (route.data['roles']) ? route.data['roles'].some((r: string) => roles.includes(r)) : false;
                    console.log('AuthGuard - canActivate - okRole: ', okRole);
                }
                if(okRole) {
                    return okRole;
                } else {
                    console.log('canActivate - okRole = false');
                    await this.router.navigate(['/auth/signin-v2'], {queryParams: {returnUrl: state.url}});
                    return false;
                }
            }
        }
    }

}
