import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public forecasts?: WeatherForecast[];

    constructor(http: HttpClient) {
      var url = environment.baseUrl + '/weatherforecast';

      http.get<WeatherForecast[]>(url).subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }

  title = 'SalonML';
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
