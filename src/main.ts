import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/components/login/login.component';
import { DisplayOrdersComponent } from './app/components/display-orders/display-orders.component';
import { DisplayMenuComponent } from './app/components/display-menu/display-menu.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: LoginComponent },
      { path: 'orders', component: DisplayOrdersComponent },
      { path: 'menu', component: DisplayMenuComponent }
    ])
  ]
}).catch(err => console.error(err));
