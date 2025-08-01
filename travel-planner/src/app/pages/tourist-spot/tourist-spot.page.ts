import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tourist-spot',
  templateUrl: './tourist-spot.page.html',
  styleUrls: ['./tourist-spot.page.scss'],
  standalone: false,
})
export class TouristSpotPage {
  name: string = '';
  price: number = 0;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'] || '';
      this.price = +params['price'] || 0;
    });
  }
}
