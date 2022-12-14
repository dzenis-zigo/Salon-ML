import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BaseHomeComponent } from '../base-home.component';
import { DynamicContentService, Editable } from '../dynamic-content.service';

@Component({
  selector: 'app-resume-reviews',
  templateUrl: './resume-reviews.component.html',
  styleUrls: ['./resume-reviews.component.css',
    '../shared-styles.css',
    '../../../shared/resume/css/style.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ResumeReviewsComponent extends BaseHomeComponent implements OnInit {
  // caption in editable is used as reviewer's name
  reviewArray: Editable[] = <Editable[]>[{}, {}, {}];

  constructor(protected override authService: AuthService,
              protected override dynContentService: DynamicContentService) {
    super(authService, dynContentService);

    dynContentService.onNewDataLoaded.subscribe( (l10n) => {
      if (l10n === "en")
        this.reviewArray = dynContentService.getEditableArray("resume-reviews-english-array");
      else
        this.reviewArray = dynContentService.getEditableArray("resume-reviews-bosnian-array");
    });
  }

  ngOnInit(): void {
  }

}
