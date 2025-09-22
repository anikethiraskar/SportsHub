import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register.component',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'Customer' // default role
  };
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
  this.http.post('http://localhost:8080/api/users/register', this.user)
    .subscribe({
      next: (res) => {
        // SweetAlert popup
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Your account has been created successfully!',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/login']); // redirect after user clicks OK
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: err.error?.message || 'Something went wrong!',
        });
      }
    });
}

}
