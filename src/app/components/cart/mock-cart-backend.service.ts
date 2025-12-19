import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MockCartBackendService {
  submitCart(payload: any): Observable<any> {
    // Simulate backend response
    return of({
      success: true,
      message: 'Order received!',
      order: payload,
      orderId: Math.floor(Math.random() * 100000)
    });
  }
}
