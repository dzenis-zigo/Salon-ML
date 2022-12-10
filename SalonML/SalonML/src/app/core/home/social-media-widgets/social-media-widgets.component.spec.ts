import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaWidgetsComponent } from './social-media-widgets.component';

describe('SocialMediaWidgetsComponent', () => {
  let component: SocialMediaWidgetsComponent;
  let fixture: ComponentFixture<SocialMediaWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMediaWidgetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
