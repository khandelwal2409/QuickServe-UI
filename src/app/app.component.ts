import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginForm: FormGroup;
  loginError = false;
  loginSuccess = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginError = true;
      return;
    }

    const { email, password } = this.loginForm.value;
    // Demo authentication
    if ((email === 'admin' || email === 'admin@example.com') && password === 'admin123') {
      this.loginError = false;
      this.loginSuccess = true;
    } else {
      this.loginError = true;
      this.loginSuccess = false;
    }
  }

  onReset() {
    this.loginForm.reset();
    this.loginError = false;
    this.loginSuccess = false;
  }
}
