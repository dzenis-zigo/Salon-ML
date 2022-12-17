import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tips-and-tricks',
  templateUrl: './tips-and-tricks.component.html',
  styleUrls: ['./tips-and-tricks.component.css',
    '../shared-styles.css',
    '../../../shared/resume/css/style.css'],
  encapsulation: ViewEncapsulation.None
})
export class TipsAndTricksComponent implements OnInit {
  blueTextSentence = "Add {blue text} by surrounding text with curly braces - ";
  brTag = "<br/>";

  constructor() { }

  ngOnInit(): void {
  }

}
