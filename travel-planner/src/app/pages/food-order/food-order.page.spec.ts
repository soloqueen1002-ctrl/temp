import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoodOrderPage } from './food-order.page';

describe('FoodOrderPage', () => {
  let component: FoodOrderPage;
  let fixture: ComponentFixture<FoodOrderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
