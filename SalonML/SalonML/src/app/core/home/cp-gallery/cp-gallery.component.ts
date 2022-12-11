import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-medical-gallery',
  templateUrl: './medical-gallery.component.html',
  styleUrls: ['./medical-gallery.component.css',
    '../shared-styles.css',
    '../../../shared/creative-parallax/css/style.css'],
  encapsulation: ViewEncapsulation.None
})
export class MedicalGalleryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
