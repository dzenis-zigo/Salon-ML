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
  private dynContentDtoDictionary: { [name: string]: DynamicContentDTO } = {};
  private dynContentDtoArrayDictionary: { [name: string]: DynamicContentDTO[]; } = {};
  private localizationValue: string; // not sure about the " | null" todo

  // call next() when page loads first time or when localization changes
  public onNewDataLoaded = new Subject<string>();

  constructor(private http: HttpClient,
              private authService: AuthService) {

    // store and retrieve localization choice for future visits
    // default language is English
    var l10nVal = localStorage.getItem(this.localizationKey);

    if (l10nVal === null) {
      this.localizationValue = "en";
      localStorage.setItem(this.localizationKey, this.localizationValue);
    }
    else
      this.localizationValue = l10nVal;

    this.fetchAndStoreDynamicContent(); //maybe call this something else
  }

  public getEditable(name: string): Editable {
    var dto = this.dynContentDtoDictionary[name];

    return this.generateEditable(dto);
  }

  public getEditableArray(name: string): Editable[] {
    var dtoArray = this.dynContentDtoArrayDictionary[name];
    var editableArray: Editable[] = new Array();

    for (let dto of dtoArray)
      editableArray.push(this.generateEditable(dto));

    return editableArray;
  }

  private generateEditable(dto: DynamicContentDTO): Editable {
    var text = (this.localizationValue === "en") ?
      dto.textEnglish :
      dto.textBosnian
      
    var caption = (this.localizationValue === "en") ?
      dto.imageCaptionEnglish :
      dto.imageCaptionBosnian

    // todo might not work for png
    var data = undefined;
    if (dto.imageData != '')
      data = "data:image/jpeg;base64," + btoa(dto.imageData);

    return <Editable>{
      id: dto.id,
      name: dto.name,
      isEditing: false,
      text: text,
      caption: caption,
      url: dto.imageUrl,
      data: data,
      iconValue: dto.iconValue
    }
  }

  // convert Editable to Dto and save it locally and on the backend
  public saveEditable(editable: Editable) {
    var newDto = this.generateDto(editable);

    this.dynContentDtoDictionary[newDto.name] = newDto;

    var updateUrl = this.url + "UpdateItem";

    this.http.put(updateUrl, newDto).subscribe();
  }

  public saveEditableArray(editableArray: Editable[]) {
    var newDtoArray = new Array();

    for (let i = 0; i < editableArray.length; i++) {
      var newDto = this.generateDto(editableArray[i]);
      newDtoArray.push(newDto);
    }

    this.dynContentDtoArrayDictionary[newDtoArray[0].name] = newDtoArray;

    var updateUrl = this.url + "UpdateArray";

    this.http.put(updateUrl, newDtoArray).subscribe();
  }

  private generateDto(editable: Editable) {
    return <DynamicContentDTO>{
      id: editable.id,
      name: editable.name,
      textEnglish: (this.localizationValue === "en") ?
        editable.text :
        this.dynContentDtoDictionary[editable.name]?.textEnglish,
      textBosnian: (this.localizationValue === "bih") ?
        editable.text :
        this.dynContentDtoDictionary[editable.name]?.textBosnian,
      imageCaptionEnglish: (this.localizationValue === "en") ?
        editable.caption :
        this.dynContentDtoDictionary[editable.name]?.imageCaptionEnglish,
      imageCaptionBosnian: (this.localizationValue === "bih") ?
        editable.caption :
        this.dynContentDtoDictionary[editable.name]?.imageCaptionBosnian,
      imageUrl: editable.url,
      imageData: (editable.data !== undefined) ?
        atob(editable.data.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')) :
        undefined,
      iconValue: editable.iconValue
    }
  }

  public setLocalization(localizationValue: string) {
    this.localizationValue = localizationValue;

    localStorage.setItem(this.localizationKey, localizationValue);

    this.onNewDataLoaded.next(this.localizationValue);
  }

  public addBlankImageToArray(name: string) {
    const postUrl = this.url + 'CreateItem' + '?name=' + name;

    var onImageCreate = new Subject<void>();

    this.http.post<DynamicContentDTO>(postUrl , null)
      .subscribe(result => {
        this.dynContentDtoArrayDictionary[name].push(result);

        onImageCreate.next();
        onImageCreate.complete();
      });

    return onImageCreate;
  }

  public deleteImageFromArray(image: Editable, newImageArray: Editable[]) {
    const id = image.id;

    const deleteUrl = this.url + 'DeleteItem' + '?id=' + id;

    this.http.delete(deleteUrl)
      .subscribe(result => {
        this.saveEditableArray(newImageArray);
      });
  }

  private fetchAndStoreDynamicContent(): void {
    console.log("running fetchAndStoreDynamicContent (make sure not more than once)")

    // load test admin data
    var testAdminData = localStorage.getItem(this.testAdminDataKey);
    if (this.authService.isTestAdmin && testAdminData !== null) {
      this.dynContentDtoDictionary = JSON.parse(testAdminData);
      return;
    }

    var getUrl = this.url + 'GetList';

    this.http.get<DynamicContentDTO[][]>(getUrl)
      .subscribe(result => { 
        // build our dynContentDtoDictionary
        result.forEach( (dtoArray: DynamicContentDTO[]) => {
          if (dtoArray.length == 1) {
            var dto = dtoArray[0];
            this.dynContentDtoDictionary[dto.name] = dto;
          }
          // if there is an array of values with this name
          else {
            this.dynContentDtoArrayDictionary[dtoArray[0].name] = dtoArray
          }

        });

        // set new test admin data
        if (this.authService.isTestAdmin && testAdminData === null)
          localStorage.setItem(
            this.testAdminDataKey,
            JSON.stringify(this.dynContentDtoDictionary));

        this.onNewDataLoaded.next(this.localizationValue);
      });
  }
}

export interface Editable {
  id: number;
  name: string;
  isEditing: boolean;
  text: string;
  caption: string;
  url?: string;
  data?: any; // todo figure out type for byte array
  iconValue?: string;
}

interface DynamicContentDTO {
  id: number;
  name: string;
  textEnglish?: string;
  textBosnian?: string;
  imageCaptionEnglish?: string;
  imageCaptionBosnian?: string;
  imageUrl?: string;
  imageData?: any; // todo figure out type for byte array
  iconValue?: string;
}


