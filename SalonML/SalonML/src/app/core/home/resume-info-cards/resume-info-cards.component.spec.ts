import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeInfoCardsComponent } from './resume-info-cards.component';

describe('ResumeInfoCardsComponent', () => {
  let component: ResumeInfoCardsComponent;
  let fixture: ComponentFixture<ResumeInfoCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeInfoCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeInfoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
