import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AlertController } from '@ionic/angular';

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
  quantity = 1;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private alertController: AlertController
  ) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.food = nav.extras.state['food'];
    }
  }

  async submitOrder() {
    if (!this.name || !this.email || !this.phone || !this.address) {
      await this.presentAlert('Error', 'Please fill in all required fields.');
      return;
    }

    const orderData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address,
      food_name: this.food?.name || 'Unknown Food',
      food_price: this.food?.price || 0,
      quantity: this.quantity,
    };

    this.apiService.orderFood(orderData).subscribe({
      next: async (response) => {
        console.log('Food order successful:', response);
        await this.presentAlert('Success', 'Food ordered successfully!');
        this.router.navigate(['/product']);
      },
      error: async (error) => {
        console.error('Food order failed:', error);
        await this.presentAlert(
          'Error',
          'Failed to place food order. Please try again.'
        );
      },
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
