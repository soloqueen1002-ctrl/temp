import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plan-results',
  templateUrl: './plan-results.page.html',
  styleUrls: ['./plan-results.page.scss'],
  standalone: false,
})
export class PlanResultsPage implements OnInit {

  budget: string = '';
  days: string = '';
  interest: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.budget = params['budget'] || '';
      this.days = params['days'] || '';
      this.interest = params['interest'] || '';
    });
  }
}
