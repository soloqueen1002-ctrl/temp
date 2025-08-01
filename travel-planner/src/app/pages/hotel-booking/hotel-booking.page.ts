import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.hotel = nav.extras.state['hotel'];
    }
  }

  submitBooking() {
    const bookingData = {
      hotel: this.hotel.name,
      price: this.hotel.price,
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address
    };

    console.log('Booking confirmed:', bookingData);

    // Optional: Send to backend via APIService
    alert('Hotel booking confirmed!');
  }
}

