import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeContactUsComponent } from './resume-contact-us.component';

describe('ResumeContactUsComponent', () => {
  let component: ResumeContactUsComponent;
  let fixture: ComponentFixture<ResumeContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeContactUsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
