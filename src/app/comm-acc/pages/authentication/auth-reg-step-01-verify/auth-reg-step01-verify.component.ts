import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../../theme/shared/shared.module";
import {RegNavBarComponent} from "../../../../theme/shared/components/reg-nav-bar/reg-nav-bar.component";

@Component({
  selector: 'app-auth-reg-step-01-verify',
    standalone: true,
    imports: [CommonModule, SharedModule, RegNavBarComponent],
  templateUrl: './auth-reg-step01-verify.component.html',
  styleUrls: ['./auth-reg-step01-verify.component.scss']
})
export default class AuthRegStep01VerifyComponent {

}
