import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { BaseHomeComponent } from '../base-home.component';
import { DynamicContentService, Editable } from '../dynamic-content.service';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewsComponent extends BaseHomeComponent implements OnInit {

  subtitle: Editable = <Editable>{};
  title: Editable = <Editable>{};
  reviewArray: Editable[] = <Editable[]>[];
  totalRating: Editable = <Editable>{};
  totalCount: Editable = <Editable>{};
  localizationValue: string = "en";

  swiperConfig: any = {
    slidesPerView: 1,
    spaceBetween: 25,
    autoplay: {
      delay: 3000
    },
    pagination: {
      clickable: true
    },
    navigation: true,
    breakpoints: {
      300: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      }
    }
  }
  

  constructor(protected override authService: AuthService,
              protected override dynContentService: DynamicContentService) {
    super(authService, dynContentService);

    dynContentService.onNewDataLoaded.subscribe((l10n) => {
      this.localizationValue = l10n;

      if (l10n === "en")
        this.reviewArray = dynContentService.getEditableArray("reviews-english-array");
      else
        this.reviewArray = dynContentService.getEditableArray("reviews-bosnian-array");

      this.subtitle = dynContentService.getEditable("reviews-subtitle");
      this.title = dynContentService.getEditable("reviews-title");
      this.totalRating = dynContentService.getEditable("reviews-total-rating");
      this.totalCount = dynContentService.getEditable("reviews-total-count");
    });
  }

  ngOnInit(): void {
  }

  deleteReview(review: Editable, index: number) {
    this.reviewArray.splice(index, 1);

    this.dynContentService.deleteItemFromArray(review, this.reviewArray);
  }

  addReview() {
    if (this.authService.isTestAdmin)
      console.log("Could not add new review - a result from ASP.NET CreateItem method is needed");

    if (this.localizationValue === "en") {
      this.dynContentService
        .addBlankItemToArray("reviews-english-array", false, true, true)
        .subscribe(() => {
          this.reviewArray = this.dynContentService.getEditableArray("reviews-english-array");
      });
    }
    else {
      this.dynContentService
        .addBlankItemToArray("reviews-bosnian-array", false, true, true)
        .subscribe(() => {
          this.reviewArray = this.dynContentService.getEditableArray("reviews-bosnian-array");
        });
    }

  }
}
