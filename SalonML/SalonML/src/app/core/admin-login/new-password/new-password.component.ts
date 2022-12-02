import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-new-password',
  templateUrl: '../admin-form.html',
    styleUrls: ['./new-password.component.css',
        '../../../shared/resume/css/style.css']
})
export class NewPasswordComponent implements OnInit {
    form!: FormGroup;
    passwordRequirements = "Must have 6+ lowercase and uppercase characters, 1 number and 1 special character";
    passwordRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

    // AdminForm variables
    subTitle = this.passwordRequirements;
    title = "Reset your password";

    firstFormControlName = "password" as const;
    firstPlaceholder = "Password";
    firstErrorMessage = "Valid password is required";

    secondFormControlName = "" as const;
    secondPlaceholder = "";
    secondErrorMessage = "";

    mainErrorMessage = "An error occurred";
    primaryButtonText = "Submit";
    failedRequest: boolean = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            password: new FormControl('', [
                Validators.required,
                Validators.pattern(this.passwordRegex)
            ])
        });
  }

    onSubmit() {
      var url = environment.baseUrl + "api/Account/NewPassword";

      var newPasswordRequest = <NewPasswordRequest>{};
      newPasswordRequest.password = this.form.controls['password'].value;
        newPasswordRequest.token = this.activatedRoute.snapshot.paramMap.get('token')!;
        newPasswordRequest.userId = this.activatedRoute.snapshot.paramMap.get('userId')!;

      return this.http.post(url, newPasswordRequest)
        .subscribe(result => {
            this.router.navigate(["/login"]);
        }, error => {
            this.failedRequest = true;
        });

  }
}

interface NewPasswordRequest {
    password: string;
    token: string;
    userId: string;
}
