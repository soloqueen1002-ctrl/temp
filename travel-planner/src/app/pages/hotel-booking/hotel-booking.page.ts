import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-hotel-booking',
  templateUrl: './hotel-booking.page.html',
  styleUrls: ['./hotel-booking.page.scss'],
  standalone: false,
})
export class HotelBookingPage {
  hotel: any;
  name = '';
  email = '';
  phone = '';
  address = '';
  checkIn = '';
  checkOut = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private alertController: AlertController
  ) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.hotel = nav.extras.state['hotel'];
    }
  }

  async submitBooking() {
    if (
      !this.name ||
      !this.email ||
      !this.phone ||
      !this.address ||
      !this.checkIn ||
      !this.checkOut
    ) {
      await this.presentAlert('Error', 'Please fill in all required fields.');
      return;
    }

    const bookingData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address,
      hotel_name: this.hotel?.name || 'Unknown Hotel',
      hotel_price: this.hotel?.price || 0,
      check_in: this.checkIn,
      check_out: this.checkOut,
    };

    this.apiService.bookHotel(bookingData).subscribe({
      next: async (response) => {
        console.log('Hotel booking successful:', response);
        await this.presentAlert('Success', 'Hotel booked successfully!');
        this.router.navigate(['/product']);
      },
      error: async (error) => {
        console.error('Hotel booking failed:', error);
        await this.presentAlert(
          'Error',
          'Failed to book hotel. Please try again.'
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
