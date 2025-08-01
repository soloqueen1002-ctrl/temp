import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanResultsPage } from './plan-results.page';

describe('PlanResultsPage', () => {
  let component: PlanResultsPage;
  let fixture: ComponentFixture<PlanResultsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
