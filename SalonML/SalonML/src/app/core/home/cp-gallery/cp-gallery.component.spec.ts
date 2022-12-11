import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpGalleryComponent } from './cp-gallery.component';

describe('MedicalGalleryComponent', () => {
  let component: CpGalleryComponent;
  let fixture: ComponentFixture<CpGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
