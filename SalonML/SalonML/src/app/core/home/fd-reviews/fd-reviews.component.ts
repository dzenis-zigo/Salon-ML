import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BaseHomeComponent } from '../base-home.component';
import { DynamicContentService, Editable } from '../dynamic-content.service';

@Component({
  selector: 'app-fd-reviews',
  templateUrl: './fd-reviews.component.html',
  styleUrls: ['./fd-reviews.component.css',
    '../shared-styles.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FdReviewsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
