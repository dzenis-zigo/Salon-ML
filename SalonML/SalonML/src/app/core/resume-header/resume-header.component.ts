import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume-header',
  templateUrl: './resume-header.component.html',
  styleUrls: ['./resume-header.component.css',
    '../../shared/vendor/css/bundle.min.css',
    '../../shared/vendor/css/LineIcons.min.css',
    '../../shared/vendor/css/revolution-settings.min.css',
    '../../shared/vendor/css/jquery.fancybox.min.css',
    '../../shared/vendor/css/owl.carousel.min.css',
    '../../shared/vendor/css/cubeportfolio.min.css',
    '../../shared/resume/css/style.css'
  ]
})
export class ResumeHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
