import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Import AlertController

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
    private alertController: AlertController // Inject AlertController
  ) {}

  async login() { // Make the method async to await the alert
    if (!this.email || !this.password) {
      await this.presentAlert('Error', 'Please enter both email and password.');
      return;
    }

    // Dummy login - replace with real authentication logic123456
    if (this.email === 'nagooreeran1980@gmail.com' && this.password === 'Sharoth@2003') {
      // In a real app, after successful login, you would:
      // 1. Store the authentication token/status (e.g., in AuthService, localStorage).
      // 2. Ensure your AuthGuard can verify this status.

      // await this.presentAlert('Success', 'Login successful!');

      // IMPORTANT: Navigate to the correct path for your authenticated area.
      // For example, to the front page of the logged-in area:
      this.router.navigate(['/product']);

      // Or if you want to go directly to a specific product detail (you'll need an ID):
      // this.router.navigate(['/logged-in-area/product-detail', 'tour-paris-101']);
      // Make sure the product ID exists in your mock data or backend.

    } else {
      await this.presentAlert('Error', 'Invalid email or password.');
    }
  }

  async forgotPassword() {
    await this.presentAlert('Info', 'Redirect to password reset page (not implemented).');
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
      buttons: ['OK']
    });
    await alert.present();
  }
}
