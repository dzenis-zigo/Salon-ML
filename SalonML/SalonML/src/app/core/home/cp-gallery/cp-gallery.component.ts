import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { BaseHomeComponent } from '../base-home.component';
import { DynamicContentService, Editable } from '../dynamic-content.service';

@Component({
  selector: 'app-cp-gallery',
  templateUrl: './cp-gallery.component.html',
  styleUrls: ['./cp-gallery.component.css',
    '../shared-styles.css',
    '../../../shared/creative-parallax/css/style.css'],
  encapsulation: ViewEncapsulation.None
})
export class CpGalleryComponent extends BaseHomeComponent implements OnInit {
  imageArray: Editable[] = <Editable[]>[{}];

  constructor(protected override authService: AuthService,
              protected override dynContentService: DynamicContentService) {
    super(authService, dynContentService);

    dynContentService.onNewDataLoaded.subscribe(() => {
      this.imageArray = dynContentService.getEditableArray("cp-gallery-image-array");
    });
  }

  ngOnInit(): void {
  }

  addImage() {
    var onImageCreate: Subject<void> = this.dynContentService.addBlankImageToArray("cp-gallery-image-array");

    onImageCreate.subscribe(() => {
      this.imageArray = this.dynContentService.getEditableArray("cp-gallery-image-array");
    });
  }

  deleteImageFromArray(index: number) {
    const imageToDelete = this.imageArray[index];

    // remove from array
    this.imageArray.splice(index, 1);

    this.dynContentService.deleteImageFromArray(imageToDelete, this.imageArray);
  }

  saveImagePosition(imageArray: Editable[], oldIndex: number, event: any) {
    var imageToMove = imageArray[oldIndex];
    imageToMove.isEditing = false;

    if (event.target.value == '')
      return;

    // assume user is using 1 as first index
    var newIndex = event.target.value - 1;

    this.imageArray.splice(oldIndex, 1);
    this.imageArray.splice(newIndex, 0, imageToMove);

    // update the orderIndexes on backend
    this.dynContentService.saveEditableArray(this.imageArray);
  }
}
