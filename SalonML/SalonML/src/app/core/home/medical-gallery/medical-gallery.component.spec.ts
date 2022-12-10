import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalGalleryComponent } from './medical-gallery.component';

describe('MedicalGalleryComponent', () => {
  let component: MedicalGalleryComponent;
  let fixture: ComponentFixture<MedicalGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
