import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { BaseHomeComponent } from '../home/base-home.component';
import { DynamicContentService, Editable } from '../home/dynamic-content.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends BaseHomeComponent implements OnInit {
  logo: Editable = <Editable>{ data: '' };

  constructor(protected override authService: AuthService,
              protected override dynContentService: DynamicContentService,
              private router: Router) {
    super(authService, dynContentService);

    dynContentService.onNewDataLoaded.subscribe(() => {
      this.logo = dynContentService.getEditable("navbar-logo");
    });
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
  }
}
