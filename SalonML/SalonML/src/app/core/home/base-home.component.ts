import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { DynamicContentService, Editable } from "./dynamic-content.service";
import { readAndCompressImage } from 'browser-image-resizer';

@Component({
  template: ''
})
export abstract class BaseHomeComponent {
  isAdmin: boolean;

  constructor(protected authService: AuthService,
              protected dynContentService: DynamicContentService) {
    this.isAdmin = authService.isLoggedIn;
  }

  setLocalization(localizationValue: string) {
    this.dynContentService.setLocalization(localizationValue);
  }

  setIsEditingTrue(item: Editable): void {
    item.isEditing = true;
  }

  saveItemChanges(item: Editable): void {
    this.modifyEditable(item);

    this.dynContentService.saveEditable(item);
  }

  saveArrayChanges(itemArray: Editable[]): void {
    for (let item of itemArray)
      this.modifyEditable(item);

    this.dynContentService.saveEditableArray(itemArray);
  }

  private modifyEditable(item: Editable) {
    item.isEditing = false;

    if (item.text === '')
      item.text = '.'; // prevent loss of editable

    // allow easier copy/pasting from fontawesome
    if (item.iconValue != null) {
      item.iconValue = item.iconValue.replace(/<i class=\"/gi, "");
      item.iconValue = item.iconValue.replace(/\"><\/i>/gi, "");
    }
  }

  saveAndUploadImage(item: Editable, event: any): void {
    item.isEditing = false;

    // compression/resizing settings
    const config = {
      quality: 0.5,
      maxWidth: 400,
      debug: false
    };

    const file: File = event.target.files[0];

    var reader = new FileReader();

    readAndCompressImage(file, config)
      .then(resizedImage => {
        // read blob
        reader.readAsDataURL(resizedImage);
      })

    // finished reading blob
    reader.onload = (event: any) => {
      item.data = event.target.result;

      this.dynContentService.saveEditable(item);
    };
  }
}
