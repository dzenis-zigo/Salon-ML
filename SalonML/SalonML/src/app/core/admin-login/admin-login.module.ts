import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    ForgotPasswordComponent,
    NewPasswordComponent
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class AdminLoginModule { }
