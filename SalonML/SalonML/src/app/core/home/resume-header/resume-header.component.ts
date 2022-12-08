import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DynamicContentService, Editable } from '../dynamic-content.service';

@Component({
  selector: 'app-resume-header',
  templateUrl: './resume-header.component.html',
  styleUrls: ['./resume-header.component.css',
        '../../../shared/resume/css/style.css'],
  encapsulation: ViewEncapsulation.Emulated
}) 
export class ResumeHeaderComponent implements OnInit {
  isAdmin: boolean;
  title: Editable = <Editable>{
    text: ''
  };
  description: Editable = <Editable>{
    text: ''
  };
  image: Editable = <Editable>{
    caption: '',
    url: '',
    data: ''
  };

  constructor(private authService: AuthService,
    private dynContentService: DynamicContentService) {
    this.isAdmin = authService.isLoggedIn;

    dynContentService.onNewDataLoaded.subscribe(() => {
      this.title = dynContentService.getEditable("resume-header-title");
      this.description = dynContentService.getEditable("resume-header-description");
      this.image = dynContentService.getEditable("resume-header-image");
    });
  }

  ngOnInit(): void {
  }

  setLocalization(localizationValue: string) {
    this.dynContentService.setLocalization(localizationValue);
  }

  setIsEditingTrue(item: Editable): void {
    item.isEditing = true;
  }

  saveChanges(item: Editable): void {
    item.isEditing = false;

    this.dynContentService.saveEditable(item);
  }

  saveAndUploadImage(item: Editable, event: any): void {
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.image.data = event.target.result;
      this.image.isEditing = false;

      this.dynContentService.saveEditable(item);
    };

    const file: File = event.target.files[0];

    reader.readAsDataURL(file);
  }
}
