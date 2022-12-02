import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../auth/auth.service';
import { AdminForm } from '../admin-form';

@Component({
  selector: 'app-login',
  templateUrl: '../admin-form.html',
  styleUrls: ['./login.component.css',
    '../../../shared/resume/css/style.css']
})
export class LoginComponent implements OnInit, AdminForm {
    form!: FormGroup;

    // AdminForm variables
    subTitle = "Welcome back";
    title = "Login as admin";

    firstFormControlName = "email" as const;
    firstPlaceholder = "Email";
    firstErrorMessage = "Email is required";

    secondFormControlName = "password" as const;
    secondPlaceholder = "Password";
    secondErrorMessage = "Password is required";

    mainErrorMessage = "The email or password was incorrect";
    primaryButtonText = "Login";
    failedRequest: boolean = false;


    constructor(
      private authService: AuthService,
      private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  onSubmit() {
      var loginRequest = <LoginRequest>{};
      loginRequest.email = this.form.controls['email'].value;
      loginRequest.password = this.form.controls['password'].value;

      this.authService.login(loginRequest)
          .subscribe(result => {
              if (result.success)
                  this.router.navigate(["/"]);
          }, error => {
              this.failedRequest = true;
              this.form.controls['password'].reset();
          });
  }
}
