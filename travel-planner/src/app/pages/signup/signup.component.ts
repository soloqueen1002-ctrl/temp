import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  gender: string = '';

  constructor(private http: HttpClient) {}

  signupUser() {
    const userData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      gender: this.gender,
    };

    this.http.post('http://127.0.0.1:8000/api/signup/', userData).subscribe(
      response => {
        alert('Signup successful!');
        console.log(response);
      },
      error => {
        alert('Signup failed!');
        console.error(error);
      }
    );
  }
}

