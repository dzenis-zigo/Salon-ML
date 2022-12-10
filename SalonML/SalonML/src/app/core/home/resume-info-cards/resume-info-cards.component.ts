import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BaseHomeComponent } from '../base-home.component';
import { DynamicContentService, Editable } from '../dynamic-content.service';

@Component({
  selector: 'app-resume-info-cards',
  templateUrl: './resume-info-cards.component.html',
  styleUrls: ['./resume-info-cards.component.css',
    '../shared-styles.css',
    '../../../shared/resume/css/style.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ResumeInfoCardsComponent extends BaseHomeComponent implements OnInit {
  subtitle: Editable    = <Editable>{};
  title: Editable       = <Editable>{};
  description: Editable = <Editable>{};
  iconArray: Editable[]   = <Editable[]>[{}, {}, {}];
  headerArray: Editable[] = <Editable[]>[{}, {}, {}];
  bodyArray: Editable[]   = <Editable[]>[{}, {}, {}];

  constructor(protected override authService: AuthService,
              protected override dynContentService: DynamicContentService) {
    super(authService, dynContentService);

    dynContentService.onNewDataLoaded.subscribe(() => {
      this.subtitle = dynContentService.getEditable("resume-info-cards-subtitle");
      this.title = dynContentService.getEditable("resume-info-cards-title");
      this.description = dynContentService.getEditable("resume-info-cards-description");
      this.iconArray = dynContentService.getEditableArray("resume-info-cards-icon-array");
      this.headerArray = dynContentService.getEditableArray("resume-info-cards-header-array");
      this.bodyArray = dynContentService.getEditableArray("resume-info-cards-body-array");
    });
  }

  ngOnInit(): void { }
}
