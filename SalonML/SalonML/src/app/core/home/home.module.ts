import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ResumeHeaderComponent } from './resume-header/resume-header.component';
import { AppRoutingModule } from '../app-routing.module';
import { ResumeContactUsComponent } from './resume-contact-us/resume-contact-us.component';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { BluePipe } from './blue.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    ResumeHeaderComponent,
    ResumeContactUsComponent,
    BluePipe
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    AngularMaterialModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
