import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cp-gallery',
  templateUrl: './cp-gallery.component.html',
  styleUrls: ['./cp-gallery.component.css',
    '../shared-styles.css',
    '../../../shared/creative-parallax/css/style.css'],
  encapsulation: ViewEncapsulation.None
})
export class CpGalleryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
