import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BaseHomeComponent } from '../base-home.component';
import { DynamicContentService, Editable } from '../dynamic-content.service';

@Component({
  selector: 'app-fd-reviews',
  templateUrl: './fd-reviews.component.html',
  styleUrls: ['./fd-reviews.component.css',
    '../shared-styles.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FdReviewsComponent extends BaseHomeComponent implements OnInit {
  // caption in editable is used as reviewer's name
  reviewArray: Editable[] = <Editable[]>[{}, {}, {}];

  constructor(protected override authService: AuthService,
              protected override dynContentService: DynamicContentService) {
    super(authService, dynContentService);

    dynContentService.onNewDataLoaded.subscribe( (l10n) => {
      if (l10n === "en")
        this.reviewArray = dynContentService.getEditableArray("fd-reviews-english-array");
      else
        this.reviewArray = dynContentService.getEditableArray("fd-reviews-bosnian-array");
    });
  }

  ngOnInit(): void {
  }

}
