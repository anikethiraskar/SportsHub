import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAboutus } from './home-aboutus';

describe('HomeAboutus', () => {
  let component: HomeAboutus;
  let fixture: ComponentFixture<HomeAboutus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAboutus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAboutus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
