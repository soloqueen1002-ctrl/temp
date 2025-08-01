import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private apiService: ApiService
  ) {}

  async login() {
    if (!this.email || !this.password) {
      await this.presentAlert('Error', 'Please enter both email and password.');
      return;
    }

    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.apiService.login(credentials).subscribe({
      next: async (response) => {
        console.log('Login successful:', response);
        await this.presentAlert('Success', 'Login successful!');
        this.router.navigate(['/product']);
      },
      error: async (error) => {
        console.error('Login failed:', error);
        await this.presentAlert('Error', 'Invalid email or password.');
      },
    });
  }

  async forgotPassword() {
    await this.presentAlert(
      'Info',
      'Password reset functionality will be implemented soon.'
    );
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  /**
   * Presents an Ionic alert dialog.
   * @param header The header text for the alert.
   * @param message The message text for the alert.
   */
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
