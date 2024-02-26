import { Injectable } from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, UrlSegmentGroup} from '@angular/router';

import { AuthenticationService } from '../service';
import {Observable} from "rxjs";
import {JwtService} from "../service/jwt.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(
      private router: Router,
      private authService: AuthenticationService,
      private jwtService: JwtService
      ) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // this.getRoutes();
        let okRole: boolean = false;
        console.log('canActivate called');
        if (!this.authService.isLoggedIn()) {
            console.log('canActivate - NOT logged in');
            await this.router.navigate(['/auth/signin-v2'], {queryParams: {returnUrl: state.url}});
            return false;
        } else {
            const clientData = this.authService.getLocalClientData();
            if(!!clientData) {
                const roles = await this.authService.getLocalClientRoles(clientData);
                console.log('User Roles: ', roles);
                console.log('Page roles: ', route.data['roles']);
                okRole = (!!route.data['roles']) ? route.data['roles'].some((r: string) => roles.includes(r)) : false;
                console.log('okRole: ', okRole);
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
