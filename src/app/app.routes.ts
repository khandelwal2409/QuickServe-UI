

import { Routes } from '@angular/router';
import { DisplayMenuComponent } from './components/display-menu/display-menu.component';
import { CartComponent } from './components/cart/cart.component';
import { DisplayOrdersComponent } from './components/display-orders/display-orders.component';
import { LoginComponent } from './components/login/login.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, // admin login
  { path: 'admin/login', component: LoginComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: DisplayOrdersComponent },

  { path: 'menu', component: DisplayMenuComponent },
  { path: '**', redirectTo: '/login' }
];
