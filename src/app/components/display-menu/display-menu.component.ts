import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService, MenuItem } from '../../services/menu.service';
import { CartService } from '../cart/cart.service';
import { MockCartBackendService } from '../cart/mock-cart-backend.service';
import { CartComponent } from '../cart/cart.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-display-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './display-menu.component.html',
  styleUrls: ['./display-menu.component.css']
})
export class DisplayMenuComponent implements OnInit {
  user: string | null = null;
  quantities: { [id: number]: number } = {};
  cartItems: any[] = [];
  selectedCategory: string = '';

  menu: MenuItem[] = [];
  loading = false;
  error = '';
  jsonResponse = '';
  categories: string[] = [];

  constructor(
    private menuService: MenuService,
    public cartService: CartService,
    private mockCartBackend: MockCartBackendService,
    private router: Router
  ) {}
  // Getter for cart total to use in template
  get cartTotal(): number {
    return this.cartItems.reduce((acc, ci) => acc + (ci.item.price * ci.quantity), 0);
  }

  // Public method to clear cart from template
  clearCart() {
    this.cartService.clearCart();
  }

  logout() {
    localStorage.removeItem('user');
     this.router.navigate(['/login']).then(success => {
    console.log('Navigation success:', success);
  });
  }

  setSelectedCategory(category: string) {
    this.selectedCategory = category;
  }
    // Parse price from number or string, removing currency symbols if present
    parsePrice(price: any): number {
      if (typeof price === 'number') {
        return price;
      }
      if (typeof price === 'string') {
        // Remove currency symbols and parse
        const numericPrice = parseFloat(price.replace(/[^0-9.-]/g, ''));
        return isNaN(numericPrice) ? 0 : numericPrice;
      }
      return 0;
    }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.loadMenu();
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      items.forEach(ci => {
        this.quantities[ci.item.id] = ci.quantity;
      });
    });
  }

  parseJsonResponse(data: any): MenuItem[] {
    console.log('🔄 [Component] Parsing JSON response:', data);
    let menuItems: MenuItem[] = [];
    // If data.menu exists and is an array, flatten all items from all categories
    if (data && Array.isArray(data.menu)) {
      data.menu.forEach((catObj: any, catIdx: number) => {
        if (catObj.items && Array.isArray(catObj.items)) {
          catObj.items.forEach((item: any, itemIdx: number) => {
            // Parse diet field to determine veg/non-veg
            const diet = (item.diet || '').toString().toLowerCase();
            const isVeg = diet.includes('veg') && !diet.includes('non');
            
            menuItems.push({
              id: item.id || item.menu_id || item.itemId || item.item_id || itemIdx + 1,
              name: item.name || item.menu_name || item.title || `Item ${itemIdx + 1}`,
              price: this.parsePrice(item.price || item.menu_price || item.cost || 0),
              category: catObj.category || item.category || item.type || 'Other',
              description: item.description || item.details || item.desc || '',
              isVeg: isVeg
            });
          });
        }
      });
    } else if (Array.isArray(data)) {
      menuItems = data;
    } else if (data && data.items && Array.isArray(data.items)) {
      menuItems = data.items;
    } else if (data && typeof data === 'object') {
      menuItems = [data];
    }
    console.log('✅ [Component] Final parsed menu items:', menuItems);
    return menuItems;
  }

  
  extractCategories(menuItems: MenuItem[]): string[] {
    const categories = [...new Set(menuItems.map(item => item.category || 'Other'))];
    console.log('📋 [Component] Categories found:', categories);
    return categories;
  }

  getItemsByCategory(category: string): MenuItem[] {
    return this.menu.filter(item => (item.category || 'Other') === category);
  }

  increaseQuantity(item: MenuItem) {
    this.cartService.addToCart(item);
  }

  decreaseQuantity(item: MenuItem) {
    this.cartService.removeFromCart(item);
  }

  getQuantity(item: MenuItem): number {
    return this.quantities[item.id] || 0;
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


  loadMenu() {
    this.loading = true;
    this.error = '';
    this.jsonResponse = '';
    this.menu = [];
    this.categories = [];
    
    console.log('🚀 [Component] Loading menu from backend...');
    
    this.menuService.getMenu().subscribe({
      next: (data) => {
        console.log('✅ [Component] Received JSON response:', data);
        
        // Parse the JSON response
        const parsedMenuItems = this.parseJsonResponse(data);
        
        if (parsedMenuItems.length > 0) {
          this.menu = parsedMenuItems;
          this.categories = this.extractCategories(parsedMenuItems);
          this.jsonResponse = JSON.stringify(data, null, 2);
          // Set default selected category to first one
          if (this.categories.length > 0) {
            this.selectedCategory = this.categories[0];
          }
          console.log('✅ [Component] Menu loaded successfully:');
          console.log(`   📊 Total items: ${this.menu.length}`);
          console.log(`   📂 Categories: ${this.categories.length}`);
          this.menu.forEach((item, index) => {
            console.log(`   ${index + 1}. ${item.name} - $${item.price} (${item.category || 'Other'})`);
          });
        } else {
          console.warn('⚠️ [Component] No menu items found in response');
          this.error = 'No menu items found in the response';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ [Component] Failed to load menu:', err);
        
        this.error = `Failed to load menu: ${err.message || 'Unknown error'}`;
        this.loading = false;
      }
    });
  }
}
