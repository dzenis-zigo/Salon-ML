import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BaseHomeComponent } from '../base-home.component';
import { DynamicContentService, Editable } from '../dynamic-content.service';
import { InstagramDOMService } from './instagram-dom.service';

@Component({
  selector: 'app-social-media-widgets',
  templateUrl: './social-media-widgets.component.html',
  styleUrls: ['./social-media-widgets.component.css',
    '../shared-styles.css',
    '../../../shared/resume/css/style.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SocialMediaWidgetsComponent extends BaseHomeComponent implements OnInit {
  subtitle: Editable = <Editable>{};
  title: Editable = <Editable>{};
  description: Editable = <Editable>{};

  constructor(protected override authService: AuthService,
              protected override dynContentService: DynamicContentService,
              private instagram: InstagramDOMService) {
    super(authService, dynContentService);

    dynContentService.onNewDataLoaded.subscribe(() => {
      this.subtitle = dynContentService.getEditable("social-media-subtitle");
      this.title = dynContentService.getEditable("social-media-title");
      this.description = dynContentService.getEditable("social-media-description");
    });
  }

  ngOnInit(): void {
    this.instagram.processEmbeddedInstagramPosts();
  }

}
