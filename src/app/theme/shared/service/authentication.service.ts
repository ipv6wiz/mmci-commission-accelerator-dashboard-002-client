import {inject, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, lastValueFrom, Observable, Subscription} from 'rxjs';
import { Client } from '../entities/client.interface';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ClientService} from "./client.service";
import * as auth from 'firebase/auth';
import {SignupFormDataDto} from "../dtos/signup-form-data.dto";
import {LoginFormDataDto} from "../dtos/login-form-data.dto";
import {ApiResponse} from "../dtos/api-response.dto";
import {HttpClient} from "@angular/common/http";
import {NGXLogger} from "ngx-logger";
import {environment} from "../../../../environments/environment";
import {ClientLoginResponseDto} from "../dtos/client-login-response.dto";
import {CookieService} from "ngx-cookie-service";


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private cookieService = inject(CookieService)
  private apiUrl = environment.gcpCommAccApiUrl;
  private cookieDomain: string = environment.gcpApiCookieDomain;
  authStateSub: Subscription | null = null;
  clientData: any;
  returnUrl = '';
  signUpAction: boolean = false;


  constructor(
      private router: Router,
      public afAuth: AngularFireAuth,
      public clientService: ClientService,
      private http: HttpClient,
      private logger: NGXLogger,
  ) {}

    /**
     * Converted to use API
     * @param signUpFormData : SignupFormDataDto
     */
  async signUp(signUpFormData: SignupFormDataDto) {
      this.signUpAction = true;
      try {
          const response = await this.clientService.signUpClient(signUpFormData);
          if(!!response) {
              // {userRecord, firstName: userFormData.firstName, lastName: userFormData.lastName}
              const routeResponse = await this.router.navigate(['auth/verify-email-address', {userData: JSON.stringify(response)}]);
              if(!routeResponse) {
                  throw new Error('Routing after sign up failed');
              }
          } else {
              throw new Error('SignUp - Error')
          }
      } catch (err: any) {
          console.log('Caught signUp Error');
          throw new Error(err.message);
      }
  }

      // Reset Forgot password
    ForgotPassword(passwordResetEmail: string) {
        return this.afAuth
            .sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            })
            .catch((error) => {
                console.log('Caught ForgotPassword Error');
                throw new Error(error.message);
            });
    }

  async loginViaApi(loginFormData: LoginFormDataDto, returnUrl: string = ''): Promise<any> {
      console.log('loginViaApi - entered');
      try {
        const response: ApiResponse = await lastValueFrom(this.loginClient(loginFormData));
        console.log('loginViaApi - response: ', response);
        if(response.statusCode === 200) {
            this.setApiClientData(response.data);
            const data = response.data.client;
          console.log('loginViaApi - data: ', data);
          this.returnUrl = data.defaultPage;
            if(!this.returnUrl) {
                this.returnUrl = data.defaultPage;
            }
            console.log(`loginViaApi - returnUrl = ${this.returnUrl}`);
            // return this.router.navigate([this.returnUrl]);
          return this.returnUrl;
        } else {
            if(response.statusCode === 499) {
                throw new Error(response.msg);
            }
            throw new Error(`Login failed for ${loginFormData.email}`);
        }
      } catch (err: any) {
          const msg: string = `Dash002-Client - loginViaApi - error - msg: ${err.message}`;
            this.logger.log(msg);
            throw new Error(msg);
      }
  }

  loginClient(loginFormData: LoginFormDataDto): Observable<ApiResponse> {
      return this.http.post<any>(`${this.apiUrl}/auth/login`, loginFormData);
  }

  async login(loginFormData: LoginFormDataDto, returnUrl: string = '') {
     const {email, password} = loginFormData;
     if(email && password) {
       this.signUpAction = false;
       return this.afAuth
         .signInWithEmailAndPassword(email, password)
         .then(async (result) => {
           console.log('login client - user result: ', result);
           const user = result.user;
           if (!user) {
             throw new Error('Invalid User');
           } else {
             if (!user.emailVerified) {
               throw new Error('Please verify your email address, check the email account you used for signup');
             } else {
               return this.SetClientData(user)
                 .then((data: any) => {
                   this.getCurrentClientDocument(data.clientId)
                     .then((clientDoc) => {
                       console.log('login - before - clientData:', this.clientData);
                       console.log('login -  doc:', clientDoc);
                       // @TODO Handle missing returnUrl and/or defaultPage
                       // const clientDoc = doc;
                       const { defaultPage, dreNumber, firstName, lastName } = clientDoc;
                       this.clientData.dreNumber = dreNumber;
                       this.clientData.firstName = firstName;
                       this.clientData.lastName = lastName;
                       console.log('login - After - clientData:', this.clientData);
                       // localStorage.setItem('client', JSON.stringify(this.clientData));
                       sessionStorage.setItem('client', JSON.stringify(this.clientData))
                       if (!this.returnUrl) {
                         this.returnUrl = defaultPage;
                       }
                       console.log(`Login - returnUrl = ${this.returnUrl}`);
                       return this.router.navigate([this.returnUrl]);
                     })
                     .catch((err) => {
                       throw new Error('login - getCurrentClientDocument - error:' + err.message);
                     })
                 })
                 .catch((err) => {
                   throw new Error('login - catch - ' + err.message);
                 });
             }
           }
         })
         .catch((error) => {
           console.log('Caught Login Error: ', error.message);
           throw new Error(error.message);
         });
     }
  }

  async logoutViaApi(): Promise<any> {
      console.log('logoutViaApi called');
      try {
          const response: ApiResponse = await lastValueFrom(this.logoutClient());
          if(response.statusCode === 200) {
              const uid = this.getLocalClientDataProp('uid');
              console.log('UID from Session Data: ', uid);
              this.cookieService.delete(`secureCookie-${uid}`,'/', this.cookieDomain, true, 'None');
              sessionStorage.removeItem('client');
              sessionStorage.removeItem('idToken');
              return await this.router.navigate(['/auth/signin-v2']);
          } else {
              throw new Error('Error while logging out client');
          }
      } catch (e: any) {
          throw new Error(e.message);
      }

  }

  logoutClient(): Observable<ApiResponse> {
      return this.http.get<any>(`${this.apiUrl}/auth/logout`);
  }

  // logout() {
  //     console.log(`Logout called - signUpAction: ${this.signUpAction}`);
  //     if(!this.signUpAction) {
  //         this.afAuth.signOut()
  //             .then(() => {
  //                 console.log('Logout');
  //                 // localStorage.removeItem('client');
  //                 sessionStorage.removeItem('client');
  //                 this.router.navigate(['/auth/signin-v2']);
  //             })
  //             .catch((err) => {
  //                 throw new Error(`Logout - ${err.message}`);
  //             })
  //     } else {
  //         console.log('Logout - SignUp in process');
  //     }
  //
  // }

    // Returns true when client is logged in and email is verified
    isLoggedIn(): boolean {
        const client = JSON.parse(sessionStorage.getItem('client')!);
        console.log('isLoggedIn - client: ', client);
        return client && client.emailVerified !== false;
    }

    /**
     * @TODO:  Need to get the record to set the defaultPage
     * @constructor
     */
    GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
            console.log('GoogleAuth - res: ', res);
            this.router.navigate(['dashboard/analytics']);
        });
    }

     setApiClientData(clientData: ClientLoginResponseDto) {
        this.setLocalClientData(clientData, 'client');
    }

    /* Setting up client data when sign in with clientname/password,
   sign up with clientname/password and sign in with social auth
   provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    async SetClientData(client: any, from: string = 'login', data: any = null) {
        console.log('SetClientData - client.uid: ', client.uid);
        console.log(`SetClientData called from: ${from} - client.uid: ${client.uid}`)
        let dreNumber: string = '';
        let firstName: string = '';
        let lastName: string = ''
        let clientDoc = null;
        if(!!data) {
            console.log('SetClientData - data param: ', data);
            dreNumber = data.dreNumber;
            firstName = data.firstName;
            lastName = data.lastName;
        }


        const idToken = await client.getIdToken();
        const accessToken = client.auth.currentUser.accessToken;
        console.log('SetClientData - idToken: ', idToken);
        const updateData = {
            photoURL: client.photoURL,
            emailVerified: client.emailVerified,
            lastLogin: new Date(parseInt(client.metadata.lastLoginAt)).toString(),
            idToken: idToken || '',
            accessToken: accessToken || '',
        };
        this.clientData = {
            uid: client.uid,
            email: client.email,
            displayName: client.displayName,
            photoURL: client.photoURL,
            emailVerified: client.emailVerified,
            idToken: idToken || '',
            accessToken: accessToken || '',
            lastLogin: new Date(parseInt(client.metadata.lastLoginAt)).toString(),
        };
        this.setLocalClientData(this.clientData, 'client');
        this.setLocalClientData(idToken, 'idToken');
        this.setLocalClientData(accessToken, 'accessToken');
        console.log('SetClientData - clientData.uid: ', this.clientData.uid);
        try {
            clientDoc = await this.clientService.getOne(client.uid);
        } catch (err: any) {
            console.log(`Client with uid: ${client.uid} had error: ${err.message}`);
            clientDoc = null;
        }
        if(clientDoc === null) {
            console.log('New Client');
            this.clientData.roles = ['CLIENT-PENDING-REGISTRATION'];
            this.clientData.status = 'Client Pending Registration';
            this.clientData.defaultPage = '/reg/reg-form';
            this.clientData.dreNumber = dreNumber;
            this.clientData.firstName = firstName;
            this.clientData.lastName = lastName;
            this.clientData.displayName = `${firstName} ${lastName}`;
            this.setLocalClientData(this.clientData, 'client');
            return ;
        } else {
            console.log('SetClientData - clientDoc: ', clientDoc);
            this.clientData.dreNumber = clientDoc.dreNumber;
            this.clientData.firstName = clientDoc.firstName;
            this.clientData.lastName = clientDoc.lastName ;
            this.clientData.displayName = clientDoc.displayName;
            this.clientData.bucket = clientDoc.bucket;
            this.setLocalClientData(this.clientData, 'client');
            return this.clientService.update(this.clientData.uid, updateData);
        }
    }

    getLocalClientData(type: string = 'client'): any {
        const data = sessionStorage.getItem(type);
        console.log(`getLocalClientData - ${type}: `, data);
        if(data && data !== undefined) {
          if(type === 'client') {
            const obj = JSON.parse(data);
            return obj[type];
          } else {
            return JSON.parse(data);
          }
        } else {
            return null;
        }
    }

    getLocalIdToken(): string | null {
      let idToken: string | null = sessionStorage.getItem('idToken');
      let clientData;
      if(!idToken) {
        const clientDataRaw = sessionStorage.getItem('client');
        if(clientDataRaw) {
          clientData = JSON.parse(clientDataRaw);
        }
        if(clientData){
          idToken = clientData['idToken']
        }
        if(idToken) {
          sessionStorage.setItem('idToken', idToken);
          return sessionStorage.getItem('idToken');
        } else {
          return null;
        }
      } else {
        return idToken;
      }
    }

    setLocalClientData(data: any, type: string = 'client') {
      if(data !== undefined) {
        if(type === 'client') {
          sessionStorage.setItem(type, JSON.stringify(data));
        } else if(['idToken', 'accessToken'].includes(type)) {
          sessionStorage.setItem(type, data);
        }

      }
    }

    setLocalClientDataProp(prop: string, value: any, type: string = 'client') {
        let data = this.getLocalClientData(type);
        if(!data) {
            data = {};
        }
        data[prop] = value;
        this.setLocalClientData(data, type);
    }

    getLocalClientDataProp(prop: string, type: string = 'client'): string {
        const data = this.getLocalClientData(type);
        if(!!data) {
            if(!!data[prop]) {
                return data[prop];
            }
        }
        return '';
    }

    async getCurrentClientDocument(uid: string = '') {
        if(uid === '') {
            this.clientData =  this.getLocalClientData('client');
            if(this.clientData !== null) {
                uid = this.clientData.uid;
            } else {
                uid = '';
            }
        }
        if(uid !== '') {
            const response = await this.clientService.getOne(uid);
            return response;
        } else {
            console.log('getCurrentClientDocument - Client not found in LocalData');
            // this.logoutViaApi().then();
        }

    }

    async getLocalClientRoles(clientData: any): Promise<string[]> {
        const client = this.getLocalClientData('client');
        if(!!client) {
            return !!client.roles ? client.roles : [];
        } else {
            return []
        }
    }

    async getCurrentClientRoles(uid: string = ''): Promise<string[]> {
        const clientDoc = await this.getCurrentClientDocument(uid);
        if(!!clientDoc) {
            return clientDoc.roles;
        } else  {
            return ['guest'];
        }
    }

    // Auth logic to run auth providers
    AuthLogin(provider: any) {
        return this.afAuth
            .signInWithPopup(provider)
            .then((result) => {
                this.SetClientData(result.user)
                    .then(() => {
                        const client = JSON.stringify(result.user);
                        // localStorage.setItem('client', client);
                        sessionStorage.setItem('client', client);
                        // console.log(`AuthLogin - SetClientData - res: ${client}`);
                        console.log('You have been successfully logged in!: ', this.isLoggedIn());
                        this.router.navigate(['dashboard','analytics']);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
