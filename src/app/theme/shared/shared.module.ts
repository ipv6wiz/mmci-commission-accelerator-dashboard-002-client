// Angular Import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// project import
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CardComponent } from './components/card/card.component';
import { ModalModule } from './components/modal/modal.module';
import { DataFilterPipe } from './filter/data-filter.pipe';
import { TodoListRemoveDirective } from './directive/todo-list-remove.directive';
import { TodoCardCompleteDirective } from './directive/todo-card-complete.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DemoAlertComponent } from './components/demo-alert/demo-alert.component';

// third party
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import 'hammerjs';
import 'mousetrap';
import { GalleryModule } from '@ks89/angular-modal-gallery';

// bootstrap import
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbTooltipModule,
  NgbModule,
  NgbAccordionModule,
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbProgressbarModule
} from '@ng-bootstrap/ng-bootstrap';
import {AlertComponent} from "./_helpers/alert/alert.component";

import { RegNavBarRightComponent } from './components/reg-nav-bar/reg-nav-bar-right/reg-nav-bar-right.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {DisableControlDirective} from "./directive/disable-control.directive";
import { MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { FileUploadComponent } from './components/file-upload/file-upload.component';





const bootstrap = [
  NgbDropdownModule,
  NgbNavModule,
  NgbTooltipModule,
  NgbModule,
  NgbAccordionModule,
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbProgressbarModule
];

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        CardComponent,
        BreadcrumbComponent,
        ModalModule,
        GalleryModule,
        NgScrollbarModule,
        DemoAlertComponent,
        AlertComponent,
        bootstrap,
        NgClickOutsideDirective,


    ],
    exports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
        CardComponent,
        BreadcrumbComponent,
        ModalModule,
        GalleryModule,
        DataFilterPipe,
        TodoListRemoveDirective,
        TodoCardCompleteDirective,
        DisableControlDirective,
        SpinnerComponent,
        NgScrollbarModule,
        DemoAlertComponent,
        AlertComponent,
        bootstrap,
        NgClickOutsideDirective,
        RegNavBarRightComponent,
        FooterComponent,
        FileUploadComponent,


    ],
  declarations: [
      DataFilterPipe,
      DisableControlDirective,
      TodoListRemoveDirective,
      TodoCardCompleteDirective,
      SpinnerComponent,
      RegNavBarRightComponent,
      FooterComponent,
      FileUploadComponent,
  ]
})
export class SharedModule {}
