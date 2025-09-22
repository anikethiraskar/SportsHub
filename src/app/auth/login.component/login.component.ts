import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post('http://localhost:8080/api/users/login', { email: this.email, password: this.password }, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          this.message = res;
          this.router.navigate(['/home']); // redirect after login
        },
        error: (err) => {
          this.message = err.error || 'Login failed!';
        }
      });
  }
}
