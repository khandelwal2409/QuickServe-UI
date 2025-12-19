import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      role: ['admin', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      const { role, email, password } = this.loginForm.value;
      console.log('Login attempt:', { role, email, password });
      this.errorMessage = '';

      if (role === 'admin') {
        if ((email === 'admin' || email === 'admin@example.com') && password === 'admin123') {
          localStorage.setItem('user', email);
          this.router.navigate(['/orders']);
          return;
        }
        this.errorMessage = 'Invalid admin credentials (demo)';
        return;
      }

      // role === 'user'
      if ((email === 'user' || email === 'user@example.com') && password === 'user123') {
        localStorage.setItem('user', email);
        this.router.navigate(['/menu']);
        return;
      }
      this.errorMessage = 'Invalid user credentials (demo)';
    } else {
      this.errorMessage = 'Please check your input and try again.';
    }
  }

  onReset() {
    this.loginForm.reset();
    this.submitted = false;
    this.errorMessage = '';
  }
}
