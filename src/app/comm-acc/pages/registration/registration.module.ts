import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationRoutingModule} from "./registration-routing.module";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule, RegistrationRoutingModule
  ],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { showError: true}
        }
    ]
})
export class RegistrationModule { }
