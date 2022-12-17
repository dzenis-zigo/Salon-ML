import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ResumeHeaderComponent } from './resume-header/resume-header.component';
import { AppRoutingModule } from '../app-routing.module';
import { ResumeContactUsComponent } from './resume-contact-us/resume-contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { BluePipe } from './blue.pipe';
import { AutoFocusDirective } from './autofocus.directive';
import { SocialMediaWidgetsComponent } from './social-media-widgets/social-media-widgets.component';
import { InstagramDOMService } from './social-media-widgets/instagram-dom.service';
import { ResumeInfoCardsComponent } from './resume-info-cards/resume-info-cards.component';
import { CpGalleryComponent } from './cp-gallery/cp-gallery.component';
import { FdReviewsComponent } from './fd-reviews/fd-reviews.component';
import { FooterComponent } from './footer/footer.component';
import { ResumePictureTextsComponent } from './resume-picture-texts/resume-picture-texts.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    HomeComponent,
    ResumeHeaderComponent,
    ResumeContactUsComponent,
    BluePipe,
    AutoFocusDirective,
    SocialMediaWidgetsComponent,
    ResumeInfoCardsComponent,
    CpGalleryComponent,
    FdReviewsComponent,
    FooterComponent,
    ResumePictureTextsComponent,
    ReviewsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    CarouselModule
  ],
  providers: [
    InstagramDOMService
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
