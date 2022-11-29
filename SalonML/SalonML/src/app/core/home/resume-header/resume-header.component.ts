import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-resume-header',
  templateUrl: './resume-header.component.html',
    styleUrls: [
        '../../../shared/resume/css/style.css',
        './resume-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResumeHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
