import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BaseHomeComponent } from '../base-home.component';
import { DynamicContentService, Editable } from '../dynamic-content.service';

@Component({
  selector: 'app-resume-header',
  templateUrl: './resume-header.component.html',
  styleUrls: ['./resume-header.component.css',
        '../../../shared/resume/css/style.css'],
  encapsulation: ViewEncapsulation.Emulated
}) 
export class ResumeHeaderComponent extends BaseHomeComponent implements OnInit {
  title: Editable = <Editable>{};
  description: Editable = <Editable>{};
  image: Editable = <Editable>{
    caption: '',
    url: '',
    data: ''
  };

  constructor(protected override authService: AuthService,
              protected override dynContentService: DynamicContentService) {
    super(authService, dynContentService);

    dynContentService.onNewDataLoaded.subscribe(() => {
      this.title = dynContentService.getEditable("resume-header-title");
      this.description = dynContentService.getEditable("resume-header-description");
      this.image = dynContentService.getEditable("resume-header-image");
    });
  }

  ngOnInit(): void {
  }

}
