import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { DynamicContentService, Editable } from "./dynamic-content.service";

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
    item.isEditing = false;
    console.log(item);

    this.dynContentService.saveEditable(item);
  }

  saveArrayChanges(itemArray: Editable[]): void {
    for (let item of itemArray)
      item.isEditing = false;

    this.dynContentService.saveEditableArray(itemArray);
  }

  saveAndUploadImage(item: Editable, event: any): void {
    var reader = new FileReader();

    reader.onload = (event: any) => {
      item.data = event.target.result;
      item.isEditing = false;

      this.dynContentService.saveEditable(item);
    };

    const file: File = event.target.files[0];

    reader.readAsDataURL(file);
  }
}
