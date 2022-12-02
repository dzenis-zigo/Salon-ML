import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ResumeHeaderComponent } from './resume-header/resume-header.component';
import { AppRoutingModule } from '../app-routing.module';
import { ResumeContactUsComponent } from './resume-contact-us/resume-contact-us.component';

@NgModule({
  declarations: [
    HomeComponent,
    ResumeHeaderComponent,
    ResumeContactUsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
