import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isAdmin: boolean;

  constructor(private authService: AuthService,
    private router: Router) {
    this.isAdmin = authService.isLoggedIn;
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
