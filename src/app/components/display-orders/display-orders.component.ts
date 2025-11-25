import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Order {
  id: number;
  customer: string;
  items: { name: string; qty: number }[];
  total: number;
  status: string;
}

@Component({
  selector: 'app-display-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-orders.component.html',
  styleUrls: ['./display-orders.component.css']
})
export class DisplayOrdersComponent implements OnInit {
  orders$: Observable<Order[]> | null = null;
  loading = false;
  error = '';

  constructor() {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  // Mock API call
  fetchOrders() {
    this.loading = true;
    const mock: Order[] = [
      { id: 101, customer: 'Alice', items: [{ name: 'Pizza', qty: 2 }], total: 24.5, status: 'Preparing' },
      { id: 102, customer: 'Bob', items: [{ name: 'Burger', qty: 1 }, { name: 'Fries', qty: 1 }], total: 15.0, status: 'Dispatched' }
    ];

    // simulate network latency
    this.orders$ = of(mock).pipe(delay(600));
    // clear loading after delay
    this.orders$.subscribe({
      next: () => (this.loading = false),
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load orders';
      }
    });
  }
}
