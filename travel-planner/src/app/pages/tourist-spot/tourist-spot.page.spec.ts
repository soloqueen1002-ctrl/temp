import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TouristSpotPage } from './tourist-spot.page';

describe('TouristSpotPage', () => {
  let component: TouristSpotPage;
  let fixture: ComponentFixture<TouristSpotPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristSpotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
