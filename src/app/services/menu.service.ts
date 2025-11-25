import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category?: string;
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private endpoint = 'http://localhost:8000/api/user/menu';

  constructor(private http: HttpClient) {}

  getMenu(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.endpoint).pipe(
      catchError((err) => {
        console.error('Menu fetch failed, returning mock data', err);
        const mock: MenuItem[] = [
          { id: 1, name: 'Margherita Pizza', price: 9.99, category: 'Pizza' },
          { id: 2, name: 'Veggie Burger', price: 7.5, category: 'Burger' },
          { id: 3, name: 'Caesar Salad', price: 6.0, category: 'Salad' }
        ];
        return of(mock);
      })
    );
  }
}
