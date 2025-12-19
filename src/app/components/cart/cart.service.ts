import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../../services/menu.service';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  getCart() {
    return this.cartSubject.asObservable();
  }

  addToCart(item: MenuItem) {
    const found = this.cartItems.find(ci => ci.item.id === item.id);
    if (found) {
      found.quantity += 1;
    } else {
      this.cartItems.push({ item, quantity: 1 });
    }
    this.cartSubject.next([...this.cartItems]);
  }

  removeFromCart(item: MenuItem) {
    const found = this.cartItems.find(ci => ci.item.id === item.id);
    if (found) {
      found.quantity -= 1;
      if (found.quantity <= 0) {
        this.cartItems = this.cartItems.filter(ci => ci.item.id !== item.id);
      }
      this.cartSubject.next([...this.cartItems]);
    }
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([]);
  }

  getCartPayload() {
    return this.cartItems.map(ci => ({ id: ci.item.id, quantity: ci.quantity }));
  }
}
