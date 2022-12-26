import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { BaseHomeComponent } from '../base-home.component';
import { DynamicContentService, Editable } from '../dynamic-content.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resume-contact-us',
  templateUrl: './resume-contact-us.component.html',
  styleUrls: [
    '../../../shared/resume/css/style.css',
    '../shared-styles.css',
    './resume-contact-us.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResumeContactUsComponent extends BaseHomeComponent implements OnInit {
  // the form model
  form!: FormGroup;

  title: Editable               = <Editable>{};
  subtitle: Editable            = <Editable>{};
  namePlaceholder: Editable     = <Editable>{};
  emailPlaceholder: Editable    = <Editable>{};
  messagePlaceholder: Editable  = <Editable>{};
  submitButton: Editable        = <Editable>{};
  infoBoxHeaderArray: Editable[]            = <Editable[]>[{}, {}, {}];
  infoBoxIconArray: Editable[]              = <Editable[]>[{}, {}, {}];
  infoBoxValueArray: Editable[]             = <Editable[]>[{}, {}, {}];
  workingHoursHeader: Editable  = <Editable>{};
  workingHoursLeftColumnArray: Editable[]   = <Editable[]>[{}, {}, {}];
  workingHoursRightColumnArray: Editable[]  = <Editable[]>[{}, {}, {}];

  constructor(protected override authService: AuthService,
              protected override dynContentService: DynamicContentService,
              protected http: HttpClient) {
    super(authService, dynContentService);

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
      this.title = dynContentService.getEditable("resume-contact-us-title");
      this.subtitle = dynContentService.getEditable("resume-contact-us-subtitle");
      this.namePlaceholder = dynContentService.getEditable("resume-contact-us-name-placeholder");
      this.emailPlaceholder = dynContentService.getEditable("resume-contact-us-email-placeholder");
      this.messagePlaceholder = dynContentService.getEditable("resume-contact-us-message-placeholder");
      this.submitButton = dynContentService.getEditable("resume-contact-us-submit-button");
      this.infoBoxHeaderArray = dynContentService.getEditableArray("resume-contact-us-info-box-header-array");
      this.infoBoxIconArray = dynContentService.getEditableArray("resume-contact-us-info-box-icon-array");
      this.infoBoxValueArray = dynContentService.getEditableArray("resume-contact-us-info-box-value-array");
      this.workingHoursHeader = dynContentService.getEditable("resume-contact-us-working-hours-header");
      this.workingHoursLeftColumnArray = dynContentService.getEditableArray("resume-contact-us-working-hours-left-column-array");
      this.workingHoursRightColumnArray = dynContentService.getEditableArray("resume-contact-us-working-hours-right-column-array");
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // couldn't use [(ngModel)] inside the form so setup this instead
    if (this.isAdmin) {
      this.namePlaceholder.text = this.form.controls['name'].value;
      if (this.namePlaceholder.text != '')
        this.saveItemChanges(this.namePlaceholder);

      this.emailPlaceholder.text = this.form.controls['email'].value;
      if (this.emailPlaceholder.text != '')
        this.saveItemChanges(this.emailPlaceholder);

      this.messagePlaceholder.text = this.form.controls['message'].value;
      if (this.messagePlaceholder.text != '')
        this.saveItemChanges(this.messagePlaceholder);

      this.form.reset();

      this.submitButton.isEditing = true;
    }
    else {
      const postUrl = environment.baseUrl + "api/ContactUs/SendEmail";
      const postBody = {
        name: this.form.controls['name'].value,
        email: this.form.controls['email'].value,
        message: this.form.controls['message'].value
      };

      this.http.post(postUrl, postBody)
        .subscribe(result => {
          Swal.fire(
            'Email sent!',
            'We will be in contact with you soon!',
            'success'
          )
        });
    }
  }

  getHref(index: number): string {
    if (index === 0)
      return "https://goo.gl/maps/YUcgrAFqhDDT7ArY8";
    else if (index === 1)
      return "mailto:" + this.infoBoxValueArray[index].text;
    else if (index === 2)
      return "tel:" + this.infoBoxValueArray[index].text;

    return "";
  }
}
