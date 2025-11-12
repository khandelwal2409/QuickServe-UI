import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  template: `
    <h2>Menu Items</h2>
    <ul>
      <li *ngFor="let item of items">{{ item }}</li>
    </ul>
  `
})
export class MenuListComponent {
  @Input() items: string[] = ['Sample Item 1', 'Sample Item 2'];
}
