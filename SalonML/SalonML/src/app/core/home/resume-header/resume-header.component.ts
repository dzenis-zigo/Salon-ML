import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { DynamicContentService } from '../dynamic-content.service';

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
    name: "resume-header-title",
    isEditing: false,
    value: ''
  };
  description: Editable = <Editable>{
    name: "resume-header-description",
    isEditing: false,
    value: ''
  };

  constructor(private authService: AuthService,
    private dynContentService: DynamicContentService) {
    this.isAdmin = authService.isLoggedIn;

    dynContentService.onNewDataLoaded.subscribe(() => {
      this.title.value = dynContentService.getDynamicContentValue(this.title.name);
      this.description.value = dynContentService.getDynamicContentValue(this.description.name);
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

    this.dynContentService.setDynamicContentValues(item.name, item.value);

    // TODO API CALL HERE
  }
}

interface Editable {
  name: string;
  isEditing: boolean;
  value: string;
}
