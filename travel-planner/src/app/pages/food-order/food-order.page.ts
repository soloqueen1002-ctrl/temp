import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-order',
  templateUrl: './food-order.page.html',
  styleUrls: ['./food-order.page.scss'],
  standalone: false,
})
export class FoodOrderPage {
  food: any;
  name = '';
  email = '';
  phone = '';
  address = '';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.food = nav.extras.state['food'];
    }
  }

  submitOrder() {
    const orderData = {
      food: this.food.name,
      price: this.food.price,
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address
    };

    console.log('Food order confirmed:', orderData);

    // Optional: Send to backend via APIService
    alert('Food order placed!');
  }
}
