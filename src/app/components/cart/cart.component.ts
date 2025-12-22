import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from './cart.service';
import { MockCartBackendService } from './mock-cart-backend.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private mockCartBackend: MockCartBackendService
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.total = items.reduce((sum, ci) => sum + (ci.item.price * ci.quantity), 0);
    });
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.item);
  }

  increaseQuantity(item: any) {
    this.cartService.addToCart(item);
  }

  decreaseQuantity(item: any) {
    this.cartService.removeFromCart(item);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  sendCartToBackend() {
    const payload = this.cartService.getCartPayload();
    this.mockCartBackend.submitCart(payload).subscribe({
      next: (res) => {
        alert('Order sent successfully!\nOrder ID: ' + res.orderId);
        this.cartService.clearCart();
      },
      error: (err) => {
        alert('Failed to send order.');
      }
    });
  }
}
