// Angular Import
import {ErrorHandler, importProvidersFrom, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { ChatMsgComponent } from './theme/layout/admin/nav-bar/nav-right/chat-msg/chat-msg.component';
import { ChatUserListComponent } from './theme/layout/admin/nav-bar/nav-right/chat-user-list/chat-user-list.component';
import { FriendComponent } from './theme/layout/admin/nav-bar/nav-right/chat-user-list/friend/friend.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { SharedModule } from './theme/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from 'src/app/theme/shared/_helpers';

// third party
import { ToastrModule } from 'ngx-toastr';
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {AuthenticationService} from "./theme/shared/service";
import {GlobalErrorHandler} from "./theme/shared/_helpers/global-error-handler";
import {RegNavBarComponent} from "./theme/shared/components/reg-nav-bar/reg-nav-bar.component";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import {JwtService} from "./theme/shared/service/jwt.service";
import {RegistrationModule} from "./comm-acc/pages/registration/registration.module";
import {LoggerModule} from "ngx-logger";
import {provideEnvironmentNgxMask} from "ngx-mask";
import { provideRouter } from '@angular/router';




export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
];

@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        GuestComponent,
        ConfigurationComponent,
        NavBarComponent,
        NavigationComponent,
        NavLeftComponent,
        NavRightComponent,
        NavSearchComponent,
        ChatMsgComponent,
        ChatUserListComponent,
        FriendComponent,
        NavContentComponent,
        NavItemComponent,
        NavCollapseComponent,
        NavGroupComponent,
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AppRoutingModule,
        SharedModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        RegNavBarComponent,
        RegistrationModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        LoggerModule.forRoot({
            serverLoggingUrl: `${environment.gcpCommAccApiUrl}/logit`,
            level: environment.logLevel,
            serverLogLevel: environment.serverLogLevel,
            disableConsoleLogging: environment.hideConsole
        })
    ],
    providers: [

        importProvidersFrom(HttpClientModule),
        httpInterceptorProviders,
        {provide: ErrorHandler, useClass: GlobalErrorHandler},
        provideEnvironmentNgxMask(),
        AuthenticationService,
        JwtService
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
