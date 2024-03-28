import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
      console.log(`JWT Intercept called for ${request.method} to ${request.url}`);
      const validFunctions = environment.validCloudFunctions;
      let needsJwt = false;
      validFunctions.forEach((funcName) => {
          if(request.url.toLowerCase().indexOf(funcName) !== -1 && !needsJwt) {
            needsJwt = true;
          }
      });
    // console.log('JWT Intercept - needsJwt: ', needsJwt);
    //   console.log('JWT Intercept - isLoggedIn: ', this.authService.isLoggedIn());
    //   console.log('JWT Intercept - signUpAction: ', this.authService.signUpAction);
      if((this.authService.isLoggedIn() || this.authService.signUpAction) && needsJwt) {
          const clientData = this.authService.getLocalClientData();
          const token = clientData.idToken;
          const bearer = `Bearer ${token}`;
        // console.log('JWT Intercept - bearer: ', bearer);
        const uid = this.authService.getLocalClientDataProp('uid');
          // console.log('Bearer: ', bearer);
          request = request.clone({
            reportProgress: true,
            withCredentials: true,
                  setHeaders: {
                    'Authorization': `Bearer ${token}`,
                    'Cache-Control': 'no-cache',
                    'x-csrf-token': uid
                  }
                });
      }
      console.log('Should be using HTTP Only Cookie and Bearer Token');

    return next.handle(request);
  }
}
