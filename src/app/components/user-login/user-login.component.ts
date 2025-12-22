
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // Demo credentials check
      if ((email === 'user' || email === 'user@example.com') && password === 'user123') {
        localStorage.setItem('user', email);
        this.errorMessage = '';
        this.router.navigate(['/menu']);
        return;
      }
      this.errorMessage = 'Invalid user credentials (demo)';
    } else {
      this.errorMessage = 'Please fill in all fields correctly.';
    }
  }

  onReset() {
    this.loginForm.reset();
    this.errorMessage = '';
  }
}
