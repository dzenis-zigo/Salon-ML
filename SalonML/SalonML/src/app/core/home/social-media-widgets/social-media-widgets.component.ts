import { Component, OnInit } from '@angular/core';
import { InstagramDOMService } from './instagram-dom.service';

@Component({
  selector: 'app-social-media-widgets',
  templateUrl: './social-media-widgets.component.html',
  styleUrls: ['./social-media-widgets.component.css']
})
export class SocialMediaWidgetsComponent implements OnInit {

  constructor(private instagram: InstagramDOMService) { }

  ngOnInit(): void {
    this.instagram.processEmbeddedInstagramPosts();
  }

}
