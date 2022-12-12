import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdReviewsComponent } from './fd-reviews.component';

describe('FdReviewsComponent', () => {
  let component: FdReviewsComponent;
  let fixture: ComponentFixture<FdReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FdReviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FdReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
