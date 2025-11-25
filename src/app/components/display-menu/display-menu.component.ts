import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category?: string;
}

@Component({
  selector: 'app-display-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-menu.component.html',
  styleUrls: ['./display-menu.component.css']
})
export class DisplayMenuComponent implements OnInit {
  menu: MenuItem[] = [];
  loading = false;
  error = '';

  constructor() {}

  ngOnInit(): void {
    this.loadMenu();
  }

  async loadMenu() {
    this.loading = true;
    this.error = '';
    try {
      const res = await fetch('http://localhost:8000/api/user/menu');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      // expect data to be an array of menu items
      this.menu = Array.isArray(data) ? data : [];
    } catch (err) {
      // fallback mocked menu
      this.error = 'Failed to fetch menu from backend, showing mock data.';
      this.menu = [
        { id: 1, name: 'Margherita Pizza', price: 9.99, category: 'Pizza' },
        { id: 2, name: 'Veggie Burger', price: 7.5, category: 'Burger' },
        { id: 3, name: 'Caesar Salad', price: 6.0, category: 'Salad' }
      ];
    } finally {
      this.loading = false;
    }
  }
}
