import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  customOptions: any = {
    loop: true,
    margin: 10,
    //autoplay: true,
    dots: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      },
      940: {
        items: 3
      }
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
