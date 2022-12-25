import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
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

    dynContentService.onNewDataLoaded.subscribe(() => {
      this.subTitleArray = dynContentService.getEditableArray("resume-picture-texts-subtitle-array");
      this.titleArray = dynContentService.getEditableArray("resume-picture-texts-title-array");
      this.descriptionArray = dynContentService.getEditableArray("resume-picture-texts-description-array");
      this.imageArray = dynContentService.getEditableArray("resume-picture-texts-image-array");
    });
  }

  ngOnInit(): void {
  }

  removeLastSection() {
    const lastIndex = this.subTitleArray.length - 1;
    if (lastIndex < 0)
      return;

    const subtitleToDelete = this.subTitleArray[lastIndex];
    const titleToDelete = this.titleArray[lastIndex];
    const descriptionToDelete = this.descriptionArray[lastIndex];
    const imageToDelete = this.imageArray[lastIndex];

    // remove from array
    this.subTitleArray.splice(lastIndex, 1);
    this.titleArray.splice(lastIndex, 1);
    this.descriptionArray.splice(lastIndex, 1);
    this.imageArray.splice(lastIndex, 1);

    this.dynContentService.deleteItemFromArray(subtitleToDelete, this.subTitleArray);
    this.dynContentService.deleteItemFromArray(titleToDelete, this.titleArray);
    this.dynContentService.deleteItemFromArray(descriptionToDelete, this.descriptionArray);
    this.dynContentService.deleteItemFromArray(imageToDelete, this.imageArray);
  }

  addSection() {
    if (this.authService.isTestAdmin)
      console.log("Could not add new section - result(s) from ASP.NET CreateItem method is needed");

    var onSubtitleCreate: Subject<void> = this.dynContentService.addBlankItemToArray("resume-picture-texts-subtitle-array", true);
    var onTitleCreate: Subject<void> = this.dynContentService.addBlankItemToArray("resume-picture-texts-title-array", true);
    var onDescriptionCreate: Subject<void> = this.dynContentService.addBlankItemToArray("resume-picture-texts-description-array", false, true);
    var onImageCreate: Subject<void> = this.dynContentService.addBlankItemToArray("resume-picture-texts-image-array");

    forkJoin(
      onSubtitleCreate,
      onTitleCreate,
      onDescriptionCreate,
      onImageCreate
    ).subscribe(() => {
      this.subTitleArray = this.dynContentService.getEditableArray("resume-picture-texts-subtitle-array");
      this.titleArray = this.dynContentService.getEditableArray("resume-picture-texts-title-array");
      this.descriptionArray = this.dynContentService.getEditableArray("resume-picture-texts-description-array");
      this.imageArray = this.dynContentService.getEditableArray("resume-picture-texts-image-array");
    });
  }
}
