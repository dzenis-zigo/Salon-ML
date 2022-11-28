import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ResumeHeaderComponent } from './resume-header/resume-header.component';

@NgModule({
  declarations: [
    HomeComponent,
    ResumeHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
