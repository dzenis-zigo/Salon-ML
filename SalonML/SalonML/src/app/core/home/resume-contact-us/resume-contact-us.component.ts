import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { DynamicContentService, Editable } from '../dynamic-content.service';

@Component({
  selector: 'app-resume-contact-us',
  templateUrl: './resume-contact-us.component.html',
  styleUrls: [
    '../../../shared/resume/css/style.css',
    './resume-contact-us.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResumeContactUsComponent implements OnInit {
  form!: FormGroup;

  isAdmin: boolean;
  title: Editable = <Editable>{
    isEditing: false,
    text: ''
  };
  subtitle: Editable = <Editable>{
    isEditing: false,
    text: ''
  };
  namePlaceholder: Editable = <Editable>{
    isEditing: false,
    text: ''
  };
  emailPlaceholder: Editable = <Editable>{
    isEditing: false,
    text: ''
  };
  messagePlaceholder: Editable = <Editable>{
    isEditing: false,
    text: ''
  };
  submitButton: Editable = <Editable>{
    isEditing: false,
    text: ''
  };

  constructor(private authService: AuthService,
              private dynContentService: DynamicContentService,
              private httpClient: HttpClient) {
    this.isAdmin = authService.isLoggedIn;

    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      message: new FormControl('', [
        Validators.required
      ])
    });

    dynContentService.onNewDataLoaded.subscribe(() => {
      this.title = dynContentService.getEditable("resume-header-title");
      this.messagePlaceholder = dynContentService.getEditable("resume-header-description");
      this.submitButton = dynContentService.getEditable("resume-header-image");
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    //todo tie in backend
  }
}
