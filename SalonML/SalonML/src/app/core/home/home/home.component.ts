import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { BaseHomeComponent } from '../base-home.component';
import { DynamicContentService } from '../dynamic-content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseHomeComponent implements OnInit {
  constructor(private router: Router,
              protected override authService: AuthService,
              protected override dynContentService: DynamicContentService) {
    super(authService, dynContentService);

    if (this.router.url === "/admin-test") {
      console.log("Logging in test admin");

      authService.loginTestAdmin();

      this.router.navigate(["/"]).then(() => {
        window.location.reload();
      });
    }
  }

  ngOnInit(): void {
  }
}
