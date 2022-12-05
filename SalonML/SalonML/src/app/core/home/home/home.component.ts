import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthService) {
    if (this.router.url === "/admin-test") {
      authService.loginTestAdmin();

      this.router.navigate(["/"]).then(() => {
        window.location.reload();
      });
    }
  }

  ngOnInit(): void {
  }

}
