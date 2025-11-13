import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: [`
    .login-container { max-width: 320px; margin: 32px auto; padding: 24px; border: 1px solid #ccc; border-radius: 8px; }
    label { display: block; margin-top: 12px; }
    input { width: 100%; padding: 8px; margin-top: 4px; }
    button { margin-top: 16px; width: 100%; }
    .error { color: #c00; font-size: 0.9em; margin-top: 4px; }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = false;
  @Output() loginSuccess = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    // Simple hardcoded check for demo
    if (username === 'admin' && password === 'admin123') {
      this.loginError = false;
      this.loginSuccess.emit();
    } else {
      this.loginError = true;
    }
  }
}
