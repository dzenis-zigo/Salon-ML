import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isAdmin = false;

  constructor(private router: Router,
    private authService: AuthService,
    private http: HttpClient  ) {
    if (this.router.url === "/admin-test") {
      authService.loginTestAdmin();

      this.router.navigate(["/"]).then(() => {
        window.location.reload();
      });
    }

    this.isAdmin = authService.isLoggedIn;
  }

  ngOnInit(): void {
  }

  seedData() {
    var url = environment.baseUrl + "api/Seed/ImportLoremIpsum";

    this.http.get(url).subscribe(result => console.log(result));
  }
}
