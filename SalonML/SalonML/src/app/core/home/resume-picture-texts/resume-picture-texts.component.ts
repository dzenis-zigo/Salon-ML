import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BaseHomeComponent } from '../base-home.component';
import { DynamicContentService, Editable } from '../dynamic-content.service';

@Component({
  selector: 'app-resume-picture-texts',
  templateUrl: './resume-picture-texts.component.html',
  styleUrls: ['./resume-picture-texts.component.css',
    '../shared-styles.css',
    '../../../shared/resume/css/style.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ResumePictureTextsComponent extends BaseHomeComponent implements OnInit {
  subTitleArray: Editable[]     = <Editable[]>[{}, {}];
  titleArray: Editable[]        = <Editable[]>[{}, {}];
  descriptionArray: Editable[]  = <Editable[]>[{}, {}];
  imageArray: Editable[]        = <Editable[]>[{}, {}];

  constructor(protected override authService: AuthService,
    protected override dynContentService: DynamicContentService) {
    super(authService, dynContentService);

    this.subTitleArray = dynContentService.getEditableArray("resume-picture-texts-subtitle-array");
    this.titleArray = dynContentService.getEditableArray("resume-picture-texts-title-array");
    this.descriptionArray = dynContentService.getEditableArray("resume-picture-texts-description-array");
    this.imageArray = dynContentService.getEditableArray("resume-picture-texts-image-array");
  }

  ngOnInit(): void {
  }

}
