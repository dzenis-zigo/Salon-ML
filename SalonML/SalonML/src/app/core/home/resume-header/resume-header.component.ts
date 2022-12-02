import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-resume-header',
  templateUrl: './resume-header.component.html',
  styleUrls: ['./resume-header.component.css',
        '../../../shared/resume/css/style.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResumeHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
