import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  gender: string = '';
  password: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async signupUser() {
    if (
      !this.name ||
      !this.email ||
      !this.phone ||
      !this.gender ||
      !this.password
    ) {
      await this.presentAlert('Error', 'Please fill in all required fields.');
      return;
    }

    const userData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      gender: this.gender,
      password: this.password,
    };

    this.apiService.signup(userData).subscribe({
      next: async (response) => {
        console.log('Signup successful:', response);
        await this.presentAlert('Success', 'Signup successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: async (error) => {
        console.error('Signup failed:', error);
        await this.presentAlert('Error', 'Signup failed. Please try again.');
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
