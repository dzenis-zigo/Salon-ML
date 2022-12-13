import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BaseHomeComponent } from '../base-home.component';
import { DynamicContentService, Editable } from '../dynamic-content.service';

@Component({
  selector: 'app-construction-reviews',
  templateUrl: './construction-reviews.component.html',
  styleUrls: ['./construction-reviews.component.css',
    '../shared-styles.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ConstructionReviewsComponent extends BaseHomeComponent implements OnInit {
  // caption in editable is used as reviewer's name
  reviewArray: Editable[] = <Editable[]>[{}, {}, {}];

  constructor(protected override authService: AuthService,
              protected override dynContentService: DynamicContentService) {
    super(authService, dynContentService);

    dynContentService.onNewDataLoaded.subscribe( (l10n) => {
      if (l10n === "en")
        this.reviewArray = dynContentService.getEditableArray("construction-reviews-english-array");
      else
        this.reviewArray = dynContentService.getEditableArray("construction-reviews-bosnian-array");
    });
  }

  ngOnInit(): void {
  }

}
