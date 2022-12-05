import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root',
})
export class DynamicContentService {
  private testAdminDataKey: string = "dynamic-content";
  private localizationKey: string = "l10n";
  private url: string = environment.baseUrl + "api/DynamicContent/";
  private dynContentCollection: { [id: string]: DynamicContentItem; };

  // call next() when page loads first time or when localization changes
  public onNewDataLoaded = new Subject<void>();

  constructor(private http: HttpClient,
    private authService: AuthService) {
    this.dynContentCollection = {};
    this.fetchAndStoreDynamicContent(); //maybe call this something else
  }

  public getDynamicContentValue(id: string) {
    return this.dynContentCollection[id].value;
  }

  // update our local data when admin changes a dynContent
  public setDynamicContentValues(id: string, value: string) {
    this.dynContentCollection[id].value = value;

    var localization = localStorage.getItem(this.localizationKey);
    if (localization === "en")
      this.dynContentCollection[id].englishValue = value;
    else
      this.dynContentCollection[id].bosnianValue = value;
  }

  public setLocalization(localizationValue: string) {
    localStorage.setItem(this.localizationKey, localizationValue);

    for (var id in this.dynContentCollection) {
      this.dynContentCollection[id].value =
        (localizationValue === "en") ?
        this.dynContentCollection[id].englishValue :
        this.dynContentCollection[id].bosnianValue
    }

    this.onNewDataLoaded.next();
  }

  private fetchAndStoreDynamicContent(): void {
    console.log("running fetchAndSetAllEditables (make sure not more than once)")

    // load test admin data
    var testAdminData = localStorage.getItem(this.testAdminDataKey);
    if (this.authService.isTestAdmin && testAdminData !== null) {
      this.dynContentCollection = JSON.parse(testAdminData);
      return;
    }

    // store and retrieve localization choice for future visits
    // default language is English
    var localization = localStorage.getItem(this.localizationKey);
    if (localization === null) {
      localization = "en";
      localStorage.setItem(this.localizationKey, localization);
    }

    var getUrl = this.url + 'GetList';

    this.http.get<DynamicContentDTO[]>(getUrl)
      .subscribe(result => {
        // reformat data so it's easier to use
        result.forEach(dto => {
          this.dynContentCollection[dto.id] = <DynamicContentItem>{
            value: (localization === "en") ? dto.englishLocalization : dto.bosnianLocalization,
            englishValue: dto.englishLocalization,
            bosnianValue: dto.bosnianLocalization
          }
        });

        // set new test admin data
        if (this.authService.isTestAdmin && testAdminData === null)
          localStorage.setItem(
            this.testAdminDataKey,
            JSON.stringify(this.dynContentCollection));

        this.onNewDataLoaded.next();
      });
  }
}

interface DynamicContentItem {
  value: string;
  englishValue: string;
  bosnianValue: string;
}

interface DynamicContentDTO {
  id: string;
  type: string;
  englishLocalization: string;
  bosnianLocalization: string;
}


