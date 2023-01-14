import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import OktaAuth from '@okta/okta-auth-js';
import {OKTA_CONFIG, OktaAuthModule} from '@okta/okta-angular';
import {AppRoutingModule} from './app-routing.module';
import {ProfileComponent} from './profile/profile.component';
import {SharedModule} from "./shared/shared.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "./core/core.module";
import {MatInputModule} from "@angular/material/input";
import {NgHcaptchaModule} from "ng-hcaptcha";

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-77946468.okta.com/oauth2/default',
  clientId: '0oa6plozn12o3wexG5d7',
  redirectUri: window.location.origin + '/login/callback',
});

@NgModule({
  declarations: [AppComponent, ProfileComponent],
  imports: [BrowserModule, OktaAuthModule, AppRoutingModule, SharedModule, ReactiveFormsModule, CoreModule, MatInputModule, NgHcaptchaModule, NgHcaptchaModule.forRoot({
    siteKey: '64a69842-9133-49c8-b87e-ca094b1fceed',
  }),
    NgHcaptchaModule.forRoot()],
  providers: [
    {provide: OKTA_CONFIG, useValue: {oktaAuth}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
