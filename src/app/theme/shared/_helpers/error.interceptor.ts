import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // console.log('ErrorInterceptor - intercept - request: ', request);
      return next.handle(request).pipe(
      catchError((httpErr: HttpErrorResponse) => {
        console.log('+=+=+=>>>>>>> Error Interceptor triggered. Status: ', httpErr.status);
        if ([401, 403].includes(httpErr.status)) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            this.authenticationService.logoutViaApi().then();
        }

        const error = httpErr.error.message || httpErr.statusText;
        const msg = `${httpErr.status}: ${error} - custom`;
        const err = new Error(msg);
        return throwError(() => err);
      })
    );
  }
}
