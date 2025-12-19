
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './components/logout/logout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, LogoutComponent],
  template: `
    <div class="app-header">
      <div class="user-info" *ngIf="user">
        <span class="user-name">👤 {{ user }}</span>
        <app-logout></app-logout>
      </div>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: string | null = null;

  constructor() {
    // Demo: get user from localStorage
    this.user = localStorage.getItem('user');
  }
}

