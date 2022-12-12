import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css',
  '../shared-styles.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FooterComponent implements OnInit {
  public isAdmin = false;

  constructor(private authService: AuthService,
              private http: HttpClient) {
    this.isAdmin = authService.isLoggedIn;
  }

  ngOnInit(): void {
  }

  seedData() {
    var url = environment.baseUrl + "api/Seed/ImportLoremIpsum";

    this.http.get(url).subscribe(result => console.log(result));
  }
}
