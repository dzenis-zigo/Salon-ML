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
  title: Editable;

  constructor(private authService: AuthService) {
    this.isAdmin = authService.isLoggedIn;

    this.title = <Editable>{
      id: 'title',
      isEditing: false,
      value: 'tempval {mybluetxt}'
    };
  }

  ngOnInit(): void {
  }

  setIsEditingTrue(item: Editable) {
    item.isEditing = true;
  }

  saveChanges(item: Editable) {
    item.isEditing = false;
    console.log(item);
  }
}


interface Editable {
  id: string;
  isEditing: boolean;
  value: string;
}
