import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category?: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private backendUrl = 'http://localhost:8000/api/user/menu';

  constructor(private http: HttpClient) {}

  getMenu(): Observable<MenuItem[]> {
    console.log('🚀 [MenuService] Initiating GET request...');
    console.log('🌐 [MenuService] Target URL:', this.backendUrl);
    console.log('📅 [MenuService] Request time:', new Date().toISOString());
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }),
      withCredentials: false
    };
    
    console.log('📋 [MenuService] Request headers:', httpOptions.headers);
    console.log('🔄 [MenuService] Sending HTTP GET request...');
    
    return this.http.get<MenuItem[]>(this.backendUrl, httpOptions).pipe(
      tap((response) => {
        console.log('✅ [SUCCESS] HTTP request completed successfully!');
        console.log('📦 [SUCCESS] Raw response data:', response);
        console.log('📊 [SUCCESS] Response type:', typeof response);
        console.log('📊 [SUCCESS] Is array:', Array.isArray(response));
        
        if (Array.isArray(response)) {
          console.log('📈 [SUCCESS] Array length:', response.length);
          console.log('📋 [SUCCESS] Menu items received:');
          
          response.forEach((item, index) => {
            console.log(`   ${index + 1}. ID: ${item.id} | Name: ${item.name} | Price: $${item.price} | Category: ${item.category || 'N/A'}`);
          });
          
          if (response.length === 0) {
            console.warn('⚠️  [WARNING] Empty menu array received from backend');
          }
        } else {
          console.warn('⚠️  [WARNING] Response is not an array:', response);
        }
        
        console.log('✅ [SUCCESS] Menu service operation completed at:', new Date().toISOString());
      }),
      catchError((error) => {
        console.error('❌ [ERROR] HTTP request failed!');
        console.error('❌ [ERROR] Error occurred at:', new Date().toISOString());
        console.error('❌ [ERROR] Request URL:', this.backendUrl);
        
        // Detailed error analysis
      console.error('❌ [ERROR] Error message:', error.message || 'No message');
        throw error;
      })
    );
  }
}
