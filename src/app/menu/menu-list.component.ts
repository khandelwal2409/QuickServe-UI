import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  imports: [CommonModule],
})
export class MenuListComponent {
  @Input() items: string[] = ['Sample Item 1', 'Sample Item 2'];
}
