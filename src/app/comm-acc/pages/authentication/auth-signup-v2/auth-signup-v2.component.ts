// angular import
import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {AuthenticationService} from "../../../../theme/shared/service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SharedModule} from "../../../../theme/shared/shared.module";
import {DreLookupService} from "../../../../theme/shared/service/dre-lookup.service";
import {SignupFormDataDto} from "../../../../theme/shared/dtos/signup-form-data.dto";
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-auth-signup-v2',
  standalone: true,
    imports: [CommonModule, RouterModule, SharedModule, MatProgressSpinner],
  templateUrl: './auth-signup-v2.component.html',
  styleUrls: ['./auth-signup-v2.component.scss']
})
export default class AuthSignupV2Component implements OnInit{
    signupForm!: FormGroup;
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
        private authService: AuthenticationService,
        private dre: DreLookupService
    ) {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['dashboard/analytics']);
        }
    }

    ngOnInit(){
        this.signupForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            dreNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        });
        const togglePassword = document.querySelector('#togglePassword');
        const password = document.querySelector('#password');

        togglePassword!.addEventListener('click', () => {
            console.log('togglePassword - clicked');
            // toggle the type attribute
            const type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
            password?.setAttribute('type', type);
            // toggle the icon
            togglePassword!.classList.toggle('fa-eye-slash');
        });
    }

    get f() {
        return this.signupForm.controls;
    }

    async submit() {
        this.submitted = true;
        if (this.signupForm.invalid) {
            return;
        }
        this.error = '';
        this.alertMsg = '';
        this.loading = true;
        const signUpFormData: SignupFormDataDto = {
            email: this.f?.['email']?.value,
            password: this.f?.['password']?.value,
            dreNumber:  this.f?.['dreNumber'].value,
            firstName: this.f?.['firstName'].value,
            lastName: this.f?.['lastName'].value,

        }
        try {
            this.loading = true;
            await this.authService.signUp(signUpFormData);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }


}
