
import { Routes } from '@angular/router';
import { DisplayMenuComponent } from './components/display-menu/display-menu.component';
import { CartComponent } from './components/cart/cart.component';
import { DisplayOrdersComponent } from './components/display-orders/display-orders.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: DisplayMenuComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: DisplayOrdersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: DisplayMenuComponent }
];
