import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false,
})
export class SignupPage {
  name: string = '';
  email: string = '';
  phone: string = '';
  gender: string = '';
  password: string = '';
  confirmPassword: string = '';
  constructor(private router: Router) {}

  register() {
    if (
      !this.name || !this.email || !this.phone ||
      !this.gender || !this.password || !this.confirmPassword
    ) {
      alert('Please fill in all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    var data = {
      username: this.name,
      
    }
    // Dummy success
    alert('Signup successful!');
    this.router.navigate(['/login']);
  }
}
