import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.total = items.reduce((sum, ci) => sum + (ci.item.price * ci.quantity), 0);
    });
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.item);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
