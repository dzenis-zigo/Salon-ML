import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { BaseHomeComponent } from '../base-home.component';
import { DynamicContentService, Editable } from '../dynamic-content.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent extends BaseHomeComponent implements OnInit {
  reviewArray: Editable[] = <Editable[]>[];
  localizationValue: string = "en";

  customOptions: any = {
    loop: true,
    margin: 10,
    //autoplay: true,
    dots: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      },
      940: {
        items: 3
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
    });
  }

  ngOnInit(): void {
  }

  deleteReview(review: Editable, index: number) {
    this.reviewArray.splice(index, 1);

    this.dynContentService.deleteItemFromArray(review, this.reviewArray);
  }

  addReview() {
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
