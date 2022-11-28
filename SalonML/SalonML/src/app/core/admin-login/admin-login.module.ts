import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    LoginComponent
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
    LoginComponent
  ]
})
export class AdminLoginModule { }
