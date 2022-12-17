import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { BaseHomeComponent } from '../base-home.component';
import { DynamicContentService } from '../dynamic-content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseHomeComponent implements OnInit {
  localization = "en";

  constructor(private router: Router,
              protected override authService: AuthService,
              protected override dynContentService: DynamicContentService) {
    super(authService, dynContentService);

    // todo get rid of this
    if (this.router.url === "/admin-test") {
      authService.loginTestAdmin();

      this.router.navigate(["/"]).then(() => {
        window.location.reload();
      });
    }

    dynContentService.onNewDataLoaded.subscribe((l10n: string) => {
      this.localization = l10n;
    });
  }

  ngOnInit(): void {
  }

  isEnglishLocalization() {
    return this.localization === "en";
  }

  isBosnianLocalization() {
    return this.localization === "bih";
  }
}
