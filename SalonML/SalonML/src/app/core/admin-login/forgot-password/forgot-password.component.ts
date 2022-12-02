import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: '../admin-form.html',
    styleUrls: ['./forgot-password.component.css',
        '../../../shared/resume/css/style.css']
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;

  // AdminForm variables
  subTitle = "Forgotten password";
  title = "Request a reset link";

  firstFormControlName = "email" as const;
  firstPlaceholder = "Email";
  firstErrorMessage = "Email is required";

  secondFormControlName = "";
  secondPlaceholder = "";
  secondErrorMessage = "";

  mainErrorMessage = "An error occurred";
  primaryButtonText = "Request Link";
  failedRequest = false;

  constructor(
      private router: Router,
      private http: HttpClient  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
        email: new FormControl('', [
            Validators.email,
            Validators.required
        ])
    });
  }

  onSubmit() {
    var url = environment.baseUrl + "api/Account/ForgotPassword";

    var item = <ForgotPasswordRequest>{};
    item.email = this.form.controls['email'].value;

    // simple return type to prevent email enumeration
    return this.http.post(url, item)
      .subscribe(result => {
        // TODO maybe show a message that an email was sent
        this.router.navigate(["/"]); 
      }, error => {
        this.failedRequest = true;
      });
  }
}

interface ForgotPasswordRequest {
    email: string;
}
