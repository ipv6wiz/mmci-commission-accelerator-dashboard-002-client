// Angular import
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AuthenticationService } from 'src/app/theme/shared/service/authentication.service';
import {LoginFormDataDto} from "../../../../theme/shared/dtos/login-form-data.dto";
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ClientService } from '../../../../theme/shared/service/client.service';

@Component({
  selector: 'app-auth-signin-v2',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule, MatProgressSpinner],
  templateUrl: './auth-signin-v2.component.html',
  styleUrls: ['./auth-signin-v2.component.scss']
})
export default class AuthSigninV2Component implements OnInit {
  // public method
  usernameValue = '';
  userPassword = '';

  loginForm!: FormGroup;
  loading = false;
  loadSpinnerColor: ThemePalette = 'primary';
  loadSpinnerMode: ProgressSpinnerMode = 'indeterminate';
  loadSpinnerDiameter: string = '50';
  submitted = false;
  error = '';
  alertType = '';
  alertMsg = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authenticationService: AuthenticationService,
    private clientService: ClientService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.isLoggedIn() && !this.authenticationService.signUpAction) {
      console.log('AuthSigninV2Component - isLoggedIn and NOT in SignUp process');
      this.authenticationService.logoutViaApi().then();
    } else if(this.authenticationService.signUpAction) {
        console.log('SignUp in progress');
    } else {
        console.log('AuthSigninV2Component - NOT logged In');
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    if(togglePassword) {
      togglePassword.addEventListener('click', () => {
        // toggle the type attribute
        const type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
        password!.setAttribute('type', type);
        // toggle the icon
        if ('classList' in togglePassword) {
          togglePassword.classList.toggle('fa-eye-slash');
        }
      });
    }

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  register() {

  }

  onSubmit() {
    console.log('AuthSigninV2Component - onSubmit Entered');
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    console.log('AuthSigninV2Component - onSubmit Form VALID');
    this.error = '';
    this.loading = true;
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard/analytics';
    const loginFormData: LoginFormDataDto = {
        email: this.f?.['username']?.value,
        password: this.f?.['password']?.value
    }
    this.authenticationService.loginViaApi( loginFormData, returnUrl)
        .then((defaultPage: string) => {
            console.log('AuthSigninV2Component - return from authService - loginViaApi - returnUrl: ', defaultPage);
            this.loading = false;
            this.clientService.setClientId(this.authenticationService.getLocalClientDataProp('uid'));
            console.log('AuthSigninV2Component - return from authService - clientId: ', this.clientService.getClientId());
            const dfpParts = defaultPage.split('/');
            console.log('AuthSigninV2Component - route: ', this.route);
            // this.router.navigate(dfpParts, {relativeTo: null}).then((okOrNot: boolean) => {
            //   console.log(`AuthSigninV2Component - return from navigate - : ${okOrNot ? 'Success': 'FAILED'}`);
            // });
          this.router.navigate([defaultPage]).then((okOrNot: boolean) => {
            console.log(`AuthSigninV2Component - return from navigate to ${defaultPage} - : ${okOrNot ? 'Success': 'FAILED'}`);
          });
        })
        .catch((err) => {
            throw new Error(err.message);
        });
  }
}
