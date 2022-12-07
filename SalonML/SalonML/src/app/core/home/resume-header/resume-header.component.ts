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
    isEditing: false,
    text: ''
  };
  description: Editable = <Editable>{
    isEditing: false,
    text: ''
  };

  constructor(private authService: AuthService,
    private dynContentService: DynamicContentService) {
    this.isAdmin = authService.isLoggedIn;

    dynContentService.onNewDataLoaded.subscribe(() => {
      this.title = dynContentService.getEditable("resume-header-title");
      this.description = dynContentService.getEditable("resume-header-description");
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
}
