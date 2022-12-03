import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-resume-header',
  templateUrl: './resume-header.component.html',
  styleUrls: ['./resume-header.component.css',
        '../../../shared/resume/css/style.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ResumeHeaderComponent implements OnInit {
  isAdmin: boolean;
  isEditingTitle: boolean = false;
  title: string = "Walker{son} Hardin";

  constructor(private authService: AuthService) {
    this.isAdmin = authService.isLoggedIn;
  }

  ngOnInit(): void {
  }

}
