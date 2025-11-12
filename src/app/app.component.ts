import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>QuickServe - Admin</h1>
      <app-upload></app-upload>
      <app-menu-list></app-menu-list>
    </div>
  `,
  styles: [`.container { padding: 16px; font-family: Arial, sans-serif }`]
})
export class AppComponent { }
