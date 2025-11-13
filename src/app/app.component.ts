import { Component } from '@angular/core';

import { UploadComponent } from './upload/upload.component';
import { MenuListComponent } from './menu/menu-list.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UploadComponent, MenuListComponent, LoginComponent],
  templateUrl: './app.component.html',
  styles: [`.container { padding: 16px; font-family: Arial, sans-serif }`]
})
export class AppComponent {
  loggedIn = false;

  onLogin() {
    this.loggedIn = true;
  }
}
