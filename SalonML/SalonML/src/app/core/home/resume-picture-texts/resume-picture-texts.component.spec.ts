import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumePictureTextsComponent } from './resume-picture-texts.component';

describe('ResumePictureTextsComponent', () => {
  let component: ResumePictureTextsComponent;
  let fixture: ComponentFixture<ResumePictureTextsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumePictureTextsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumePictureTextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
